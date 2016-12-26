/**
 * Created by thilina on 12/18/16.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var datetime = require('node-datetime');

var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var config = require('../../config');
var UserService = require('../services/userService');
var router = express.Router();

// middleware protect api routes
router.use(function (req, res, next) {

    const token = req.cookies['CRM_COOKIE'];
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            "use strict";
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'failed to authenticate token.'
                });
            } else if(decoded.role == 'OPERATOR'){
                req.decoded = decoded;
                next();
            } else
                return res.status(403).send({
                    success: false,
                    message: 'not authorized'
                });
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'no token provided.'
        });
    }
});

/* logo uploading with multer middleware*/
const logoStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../uploads/logos/');
    },
    filename: function(req, file, cb) {
        /*
         * Filename format: fieldName + firstName + lastName + Timestamp
         * */
        const fileName = file.fieldname.toLowerCase() +
            '_' + Date.now();

        cb(null, fileName + path.extname(file.originalname));
    }
});

const logoUpload = multer(
    {
        storage: logoStorage,
        limits: {fileSize: 50000000}
    }
);

const logoUploader = logoUpload.fields([{
    name: 'logo',
    maxCount: 1
}]);

// route for adding a client
router.post('/add-client', logoUploader, function (req, res) {

    const client = req.body;
    client.logoFileName = '';
    if (Array.isArray(req.files.logo) && req.files.logo.length > 0) {
        client.logoFileName = req.headers.host + "/" + req.files.logo[0].filename;
    }

    mysqlConnectionPool.getConnection(function(err, connection) {

        // TODO : stage_id and blocked field is hard coded here
        let sql = 'INSERT INTO client ' +
            '(company_name, address, contact_person_name, web_site, stage_id, country, town, mlr_number, postal_code, business_registration, blocked, logo_file_name)' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let values = [client.company,client.address,client.contactPerson,client.website,1,client.country,client.town,client.mlr,client.postalCode,client.businessRegistration, 0,client.logoFileName];

        connection.query( sql, values, function(err, rows, fields) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting to client table',
                    message: err
                });
            }

            client.id = rows.insertId;

            var user = {
                id: client.id,
                username: config.client.usernamePrefix + "_" + client.id,
                password: config.client.passwordPrefix + "_" + client.id,
                role: config.roles.client
            };

            UserService.addUser(user).then(response => {
                if(client.emails && client.emails.length > 0) {
                    sql = "INSERT INTO client_mail (client_id, mail) VALUES ?";
                    values.length = 0;
                    client.emails.forEach(mail => {
                        values.push([client.id, mail]);
                    });

                    connection.query(sql, [values], function (err) {
                        if (err) throw err;
                    });
                }
                if(client.phones && client.phones.length > 0){
                    sql = "INSERT INTO client_phone (client_id, phone) VALUES ?";
                    values.length = 0;
                    client.phones.forEach(phone => {
                        values.push([client.id, phone]);
                    });
                    connection.query(sql, [values], function(err) {
                        if (err) throw err;
                    });
                }
                if(client.faxes && client.faxes.length > 0){
                    sql = "INSERT INTO client_fax (client_id, fax) VALUES ?";
                    values.length = 0;
                    client.faxes.forEach(fax => {
                        values.push([client.id, fax]);
                    });
                    connection.query(sql, [values], function(err) {
                        if (err) throw err;
                    });
                }

                connection.release();
                res.sendStatus(200);
            }, err => {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting to user table',
                    message: err
                });
            });
        });
    });
});

router.get('/client/data/:clientId', function (req, res, next) {

    const SQL = 'SELECT * FROM `client`  WHERE client_id = ' + req.params.clientId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL,  function (error, results) {



            if (error) {

                console.log("error while retrieving from to db");
                return;
            }


            if(results.length > 0 ){

                res.json(results[0]);

            }
            else{

                res.statusCode = 400; //if results are not found for this
                res.send();
            }

        });
        connection.release();
    });


});

router.get('/client/data/:clientId/name', function (req, res, next) {


    const SQL = 'SELECT company_name, client_id FROM `client` WHERE client_id =  ' + req.params.clientId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL,  function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if(results.length > 0 ){

                res.json(results[0]);

            }
            else{

                res.statusCode = 400; //if results are not found for this
                res.send();
            }

        });

        connection.release();

    });


});

router.get('/client/searchdata', function (req, res,next) {

    const SQL = 'SELECT `company_name`, `client_id` FROM `client`;';

    mysqlConnectionPool.getConnection(function(err, connection) {

        if(err){
            console.log(err);
        }

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }


            if(results.length > 0 ){
                res.json(results);
            }
            res.statusCode = 400; //if results are not found for this
            res.send();


        });

        connection.release();
    });


});

router.get('/client/data/:clientId/mail', function (req, res, next) {

    const SQL = 'SELECT * FROM `client_mail` WHERE client_id =  ' + req.params.clientId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL,  function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if(results.length > 0 ){

                res.json(results);

            }
            else{

                res.statusCode = 400; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });


});

router.get('/client/data/:clientId/phone', function (req, res, next) {

    const SQL = 'SELECT * FROM `client_phone` WHERE client_id =  ' + req.params.clientId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL,  function (error, results) {



            if (error) {

                console.log("error while retrieving from to db");
                return;
            }


            if(results.length > 0 ){

                res.json(results);

            }
            else{

                res.statusCode = 400; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });


});

router.get('/client/data/:clientId/fax', function (req, res, next) {


    var SQL = 'SELECT * FROM `client_fax` WHERE client_id =  ' + req.params.clientId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        if(err){
            console.log("Error wihile connecting database");
        }


        connection.query(SQL,  function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if(results.length > 0 ){

                res.json(results);

            }
            else{

                res.statusCode = 400; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });

});

router.get('/client/data/:clientId/products', function (req, res, next) {

    const SQL = "SELECT distinct `client_id` , client_product.`product_Id`, `name` FROM `client_product` join products "
        + "ON client_product.`product_Id`= products.product_Id\n"
        + "WHERE client_id = " + req.params.clientId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if (results.length > 0) {

                res.json(results);

            }
            else {

                res.statusCode = 400; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });
});

router.get('/client/data/:clientId/nothavingproducts', function (req, res, next) {

    const SQL = "SELECT * \n"
        + " FROM products \n"
        + " \n"
        + " WHERE product_Id not IN (SELECT distinct client_product.product_Id FROM client_product join products \n"
        + "\n"
        + "	ON client_product.product_Id= products.product_Id\n"
        + "\n"
        + "	WHERE client_id = " + req.params.clientId
        + " ) ORDER BY `product_Id` ASC ";

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if (results.length > 0) {

                res.json(results);

            }
            else {

                res.statusCode = 400; //if results are not found for this
                res.send();
            }

        });

        connection.release();


    });
});



//route for adding a product to a client/*
router.post('/client/addproduct', logoUploader, function (req, res) {

    const clientProduct = req.body.data;

    mysqlConnectionPool.getConnection(function(err, connection) {

        var SQL = "INSERT INTO `vinit_crm`.`client_product` (`client_id`, `product_Id`) " +
            "VALUES (?, '?');";
        var values = [clientProduct.clientId,clientProduct.product.product_Id];

        SQL = mysql.format(SQL, values);

        connection.query( SQL,  function(err, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting client general data',
                    message: err
                });
            }
            connection.release();
            res.sendStatus(200);

        });
    });

});

//get client branches
router.get('/client/data/:clientId/branches', function (req, res, next) {

    const SQL = "SELECT * FROM `branch` WHERE client_id = " + req.params.clientId;;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if (results.length > 0) {

                res.json(results);

            }
            else {

                res.statusCode = 200; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });
});

//route for adding a branch to a client/*
router.post('/client/addbranch',  function (req, res) {

    const clientBranch = req.body.data;

    mysqlConnectionPool.getConnection(function(err, connection) {

        var SQL = "INSERT INTO `vinit_crm`.`branch` (`branch_id`, `client_id`, `name`, `location`) " +
            "VALUES (NULL, ?, ?, ?);"

        var values = [clientBranch.clientId, clientBranch.branchName, clientBranch.branchLocation];

        SQL = mysql.format(SQL, values);

        connection.query( SQL,  function(err, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting client general data',
                    message: err
                });
            }
            connection.release();
            res.sendStatus(200);

        });
    });

});

//route for adding a till to a client/*
router.post('/client/addtill', logoUploader, function (req, res) {

    const clientTill = req.body.data;

    mysqlConnectionPool.getConnection(function(err, connection) {



           var SQL = "INSERT INTO `vinit_crm`.`till` (`till_id`, `till_key`, `expiredate`, `client_id`, `branch_id`,  `product_Id`) "
               + "VALUES (NULL, ?, ? , ?, ? , ? );";

        var values = [clientTill.tillKey, clientTill.expireDate, clientTill.clientId, clientTill.branchId , clientTill.productId];

        SQL = mysql.format(SQL, values);


        connection.query( SQL,  function(err, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting client general data',
                    message: err
                });
            }
            connection.release();
            res.sendStatus(200);

        });
    });

});

//route for block a client/*
router.post('/client/block',  function (req, res) {

    const data = req.body.data;

    if(!data || !data.clientId || !data.note ) { res.sendStatus(406); return;}

    mysqlConnectionPool.getConnection(function(err, connection) {

        var dt = datetime.create();

        //format to insert to the data base 2016-12-26 00:07:18
        var formatted = dt.format('Y-m-d H:M:S');

        var logSQL = "INSERT INTO `vinit_crm`.`block_unblock_client_note` (`client_id`, `user_id`, `note`, `loggedTime`) "
            + "VALUES ('?', '?', ?, ?);"

        var logValues = [data.clientId, req.decoded.uid , data.note, formatted];

        logSQL = mysql.format(logSQL, logValues);

        var updateSQL = "UPDATE `vinit_crm`.`client` SET `blocked` = \'1\' WHERE `client`.`client_id` = '?';";

        var updateValues = [data.clientId];

        updateSQL = mysql.format(updateSQL, updateValues);

        //transaction for adding data to both log and updating client
        connection.beginTransaction(function(err) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting client general data',
                    message: err
                });
            }
            connection.query( logSQL, function(err, result) {
                if (err) {
                    return connection.rollback(function() {
                        res.status(406).json({
                            success: false,
                            status: 'Failed while inserting client general data',
                            message: err
                        });
                    });
                }


                connection.query(updateSQL, function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                             res.status(406).json({
                                success: false,
                                status: 'Failed while inserting client general data',
                                message: err
                            });
                        });
                    }
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function() {
                                res.status(406).json({
                                    success: false,
                                    status: 'Failed while inserting client general data',
                                    message: err
                                });
                            });
                        }
                        res.sendStatus(200);
                    });
                });
            });
        });
        connection.release();


    });

});


//route for UNblock a client/*
router.post('/client/unblock',  function (req, res) {

    const data = req.body.data;

    if(!data || !data.clientId || !data.note ) { res.sendStatus(406); return;}

    mysqlConnectionPool.getConnection(function(err, connection) {

        var dt = datetime.create();

        //format to insert to the data base 2016-12-26 00:07:18
        var formatted = dt.format('Y-m-d H:M:S');

        var logSQL = "INSERT INTO `vinit_crm`.`block_unblock_client_note` (`client_id`, `user_id`, `note`, `loggedTime`) "
            + "VALUES ('?', '?', ?, ?);"

        var logValues = [data.clientId, req.decoded.uid , data.note, formatted];

        logSQL = mysql.format(logSQL, logValues);

        var updateSQL = "UPDATE `vinit_crm`.`client` SET `blocked` = \'0\' WHERE `client`.`client_id` = '?';";

        var updateValues = [data.clientId];

        updateSQL = mysql.format(updateSQL, updateValues);

        //transaction for adding data to both log and updating client
        connection.beginTransaction(function(err) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting client general data',
                    message: err
                });
            }
            connection.query( logSQL, function(err, result) {
                if (err) {
                    return connection.rollback(function() {
                        res.status(406).json({
                            success: false,
                            status: 'Failed while inserting client general data',
                            message: err
                        });
                    });
                }


                connection.query(updateSQL, function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            res.status(406).json({
                                success: false,
                                status: 'Failed while inserting client general data',
                                message: err
                            });
                        });
                    }
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function() {
                                res.status(406).json({
                                    success: false,
                                    status: 'Failed while inserting client general data',
                                    message: err
                                });
                            });
                        }
                        res.sendStatus(200);
                    });
                });
            });
        });
        connection.release();


    });

});

//route for adding a note to a client/*
router.post('/client/addnote', logoUploader, function (req, res) {

    const data = req.body.data;

    var dt = datetime.create();

    //format to insert to the data base 2016-12-26 00:07:18
    var formatted = dt.format('Y-m-d H:M:S');


    var SQL = "INSERT INTO `vinit_crm`.`client_note` (`client_id`, `user_id`, `subject`, `note`, `loggedTime`) " +
        "VALUES ('?', '?', ? , ?, ? );";

    var values = [data.clientId, req.decoded.uid ,data.subject, data.note, formatted];

    SQL = mysql.format(SQL, values);

        mysqlConnectionPool.getConnection(function(err, connection) {

            connection.query( SQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting client general data',
                        message: err
                    });
                }
                connection.release();
                res.sendStatus(200);

            });
        });

});


module.exports = router;