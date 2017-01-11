/**
 * Created by thilina on 12/18/16.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var Promise = require('promise');
var async = require('async');
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
            } else if(decoded.role == 'OPERATOR' || decoded.role == 'ADMIN'){ // both admin and operator can use these routes
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

const emailHandler = function (req, res) {
    return new Promise((fulfill, reject) => {
        const SQL = 'SELECT * FROM `client_mail` WHERE client_id =  ' + req.params.clientId;

        mysqlConnectionPool.getConnection(function(err, connection) {

            connection.query(SQL,  function (error, results) {
                if (error)
                    reject(error);
                else
                    fulfill(results);
            });

            connection.release();
        });
    });
};

const faxHandler = function (req, res) {
    return new Promise((fulfill, reject) => {
        var SQL = 'SELECT * FROM `client_fax` WHERE client_id =  ' + req.params.clientId;

        mysqlConnectionPool.getConnection(function(err, connection) {

            connection.query(SQL,  function (error, results) {

                if (error)
                    reject(error);
                else
                    fulfill(results);
            });
            connection.release();
        });
    });
};

const phoneHandler = function (req, res) {

    return new Promise((fulfill, reject) => {
        const SQL = 'SELECT * FROM `client_phone` WHERE client_id =  ' + req.params.clientId;

        mysqlConnectionPool.getConnection(function(err, connection) {

            connection.query(SQL,  function (error, results) {

                if (error)
                    reject(error);
                else
                    fulfill(results);
            });

            connection.release();
        });
    });
};

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
router.post('/client/add', logoUploader, function (req, res) {

    const client = req.body;
    client.logoFileName = '';
    if (Array.isArray(req.files.logo) && req.files.logo.length > 0) {
        client.logoFileName = "/" + req.files.logo[0].filename;
    }

    mysqlConnectionPool.getConnection(function(err, connection) {

        // blocked field is hard coded here
        let sql = 'INSERT INTO client ' +
            '(company_name, address, contact_person_name, web_site, stage_id, country, town, mlr_number, postal_code, business_registration, blocked, logo_file_name)' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let values = [client.company,client.address,client.contactPerson,client.website,client.status,client.country,client.town,client.mlr,client.postalCode,client.businessRegistration, 0,client.logoFileName];

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
                res.json({client: client.company});
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

// route for editing a client
router.post('/client/edit/:clientId', logoUploader, function (req, res) {

    const client = req.body;
    client.logoFileName = client.originalURL;
    if (Array.isArray(req.files.logo) && req.files.logo.length > 0) {
        client.logoFileName = "/" + req.files.logo[0].filename;
    }

    mysqlConnectionPool.getConnection(function(err, connection) {

        let sql = 'UPDATE client SET' +
            ' company_name = ?, address = ?, contact_person_name = ?, web_site = ?, stage_id = ?, country = ?, town = ?, mlr_number = ?, postal_code = ?, business_registration = ?, logo_file_name = ? ' +
            ' WHERE client_id = ' + connection.escape(req.params.clientId);
        let values = [client.company,client.address,client.contactPerson,client.website,client.status,client.country,client.town,client.mlr,client.postalCode,client.businessRegistration,client.logoFileName];

        connection.query( sql, values, function(err, results) {
            if (err) {
                console.log(err)
                return res.status(406).json({
                    success: false,
                    status: 'Failed while updating client table',
                    message: err
                });
            } else {
                async.parallel({
                    emails: function (callback) {
                        let sql = 'DELETE FROM client_mail  WHERE client_id = ' + req.params.clientId;
                        connection.query(sql, function (err, results) {
                            if (err) {
                                //console.log(err);
                                callback(err, null);
                            }
                            else if (client.emails && client.emails.length > 0) {
                                sql = "INSERT INTO client_mail (client_id, mail) VALUES ?";
                                const values = [];
                                client.emails.forEach(mail => {
                                    values.push([req.params.clientId, mail]);
                                });

                                connection.query(sql, [values], function (err) {
                                    if (err) {
                                        callback(err, null);
                                        //console.log(err);
                                    }
                                    else
                                        callback(null, null);
                                });
                            }
                        });
                    },
                    phones: function (callback) {
                        let sql = 'DELETE FROM client_phone  WHERE client_id = ' + req.params.clientId;
                        connection.query(sql, function (err, results) {
                            if (err)
                                callback(err, null);
                            else if (client.phones && client.phones.length > 0) {
                                sql = "INSERT INTO client_phone (client_id, phone) VALUES ?";
                                const values = [];
                                client.phones.forEach(phone => {
                                    values.push([req.params.clientId, phone]);
                                });
                                connection.query(sql, [values], function (err) {
                                    if (err)
                                        callback(err, null);
                                    else
                                        callback(null, null);
                                });
                            }
                        });
                    },
                    faxes: function (callback) {
                        let sql = 'DELETE FROM client_fax  WHERE client_id = ' + req.params.clientId;
                        connection.query(sql, function (err, results) {
                            if (err)
                                callback(err, null);
                            else if (client.faxes && client.faxes.length > 0) {
                                sql = "INSERT INTO client_fax (client_id, fax) VALUES ?";
                                const values = [];
                                client.faxes.forEach(fax => {
                                    values.push([req.params.clientId, fax]);
                                });
                                connection.query(sql, [values], function (err) {
                                    if (err)
                                        callback(err, null);
                                    else
                                        callback(null, null);
                                });
                            }
                        });
                    }
                }, function (err, results) {
                    res.sendStatus(200);
                    connection.release();
                });
            }
        });
    });
});

//route for get client all data
router.get('/client/data/:clientId', function (req, res, next) {

    const SQL = 'SELECT * FROM `client`  WHERE client_id = ' + req.params.clientId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL,  function (error, results) {

            if (error) {

                res.status(400).send(error);

            } else if(results.length > 0 ){
                let client = results[0];
                async.parallel({
                    emails: function(callback) {
                        emailHandler(req, res).then(results => {
                            let emails = [];
                            results.forEach(result => {
                                emails.push(result.mail);
                            });
                            callback(null, emails);
                        }, error => {
                            callback(error, null);
                        });
                    },
                    phones: function(callback) {
                        phoneHandler(req, res).then(results => {
                            let phones = [];
                            results.forEach(result => {
                                phones.push(result.phone);
                            });
                            callback(null, phones);
                        }, error => {
                            callback(error, null);
                        });
                    },
                    faxes: function(callback) {
                        faxHandler(req, res).then(results => {
                            let faxes = [];
                            results.forEach(result => {
                                faxes.push(result.fax);
                            });
                            callback(null, faxes);
                        }, error => {
                            callback(error, null);
                        });
                    }
                }, function(err, results) {
                    if (err)
                        console.log(err);
                    else {
                        client.emails = results.emails;
                        client.phones = results.phones;
                        client.faxes = results.faxes;
                        res.json(client);
                    }
                });
            } else{

                res.statusCode = 400; //if results are not found for this
                res.send();
            }

        });
        connection.release();
    });


});

//route for get client name
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

//route to get client company names and ids
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

//route to get client e-mail addresses
router.get('/client/data/:clientId/mail', function(req, res, next) {
    emailHandler(req, res).then(results => {
        res.json(results);
    }, error => {
        res.status(400).send(error);
    });
});

//route to get clients phone numbers
router.get('/client/data/:clientId/phone', function(req, res){
    phoneHandler(req, res).then(results => {
        res.json(results);
    }, error => {
        res.status(400).send(error);
    });
});

//route to get clients fax numbers
router.get('/client/data/:clientId/fax', function(req, res){
    faxHandler(req, res).then(results => {
        res.json(results);
    }, error => {
        res.status(400).send(error);
    });
});

//route to get clients products
router.get('/client/data/:clientId/products', function (req, res, next) {

    const SQL = "SELECT distinct `client_id` , client_product.`product_Id`, `name` FROM `client_product` join products "
        + "ON client_product.`product_Id`= products.product_Id\n"
        + "WHERE client_id = " + req.params.clientId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving products for client from db");
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

//get products which the client do not have
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

//route for add a product to a client/*
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

            var dt = datetime.create();

            //format to insert to the data base 2016-12-26 00:07:18
            var formatted = dt.format('Y-m-d H:M:S');

            //product added => 1 if product added
            //product added => 0 if product removed
            var logSQL = "INSERT INTO `vinit_crm`.`client_product_log` (`client_id`, `product_id`, `product_added`, `user_id`, `loggedTime`)"
                + " VALUES (?, '?', '1', '?', ?);";
            var logvalues = [clientProduct.clientId,clientProduct.product.product_Id, req.decoded.uid, formatted];

            logSQL = mysql.format(logSQL, logvalues);

            connection.query( logSQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting client general data',
                        message: err
                    });
                }

            });

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

        connection.query( SQL,  function(err, rows, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting client general data',
                    message: err
                });
            }

            clientBranch.branchId = rows.insertId;

            var dt = datetime.create();

            //format to insert to the data base 2016-12-26 00:07:18
            var formatted = dt.format('Y-m-d H:M:S');


            //branch added => 1 if branch added
            //branch added => 0 if branch removed
            var logSQL = "INSERT INTO `vinit_crm`.`client_branch_log` (`client_id`, `branch_id`, `branch_added`, `user_id`, `loggedTime`) "
                + " VALUES (?, '?', '1', '?', ?);";
            var logvalues = [clientBranch.clientId,clientBranch.branchId, req.decoded.uid, formatted];

            logSQL = mysql.format(logSQL, logvalues);

            connection.query( logSQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting client general data',
                        message: err
                    });
                }

            });

            connection.release();
            res.sendStatus(200);

        });
    });

});

//route for adding a till to a client/*
router.post('/client/addtill',  function (req, res) {

    const clientTill = req.body.data;

    mysqlConnectionPool.getConnection(function(err, connection) {



        var SQL = "INSERT INTO `vinit_crm`.`till` (`till_id`, `till_key`, `till_name`, `expiredate`, `client_id`, `branch_id`,  `product_Id`) "
            + "VALUES (NULL, ?, ? , ?, ? , ?, ? );";

        var values = [clientTill.tillKey, clientTill.tillName, clientTill.expireDate, clientTill.clientId, clientTill.branchId , clientTill.productId];

        SQL = mysql.format(SQL, values);

        connection.query( SQL,  function(err, rows, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting client general data',
                    message: err
                });
            }

            clientTill.tillId = rows.insertId;

            var dt = datetime.create();

            //format to insert to the data base 2016-12-26 00:07:18
            var formatted = dt.format('Y-m-d H:M:S');


            //branch added => 1 if branch added
            //branch added => 0 if branch removed
            var logSQL = "INSERT INTO `vinit_crm`.`client_till_log` (`client_id`, `till_id`, `till_added`, `user_id`, `loggedTime`) "
                + " VALUES (?, '?', '1', '?', ?);";
            var logvalues = [clientTill.clientId,clientTill.tillId, req.decoded.uid, formatted];

            logSQL = mysql.format(logSQL, logvalues);

            connection.query( logSQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting client general data',
                        message: err
                    });
                }

            });


            connection.release();
            res.sendStatus(200);

        });
    });

});

//get client tills
router.get('/client/data/:clientId/tills', function (req, res, next) {

    const SQL = "SELECT * FROM `till` WHERE client_id = " + req.params.clientId;;

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

//route for block a client/*
router.post('/client/block',  function (req, res) {

    const data = req.body.data;

    if(!data || !data.clientId || !data.note ) { res.sendStatus(406); return;}

    mysqlConnectionPool.getConnection(function(err, connection) {

        var dt = datetime.create();

        //format to insert to the data base 2016-12-26 00:07:18
        var formatted = dt.format('Y-m-d H:M:S');

        var logSQL = "INSERT INTO `vinit_crm`.`block_unblock_client_note` (`client_id`, `user_id`, `note`, `loggedTime`, `blocked`) "
            + "VALUES ('?', '?', ?, ?, '1');"

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
router.post('/client/unblock',  function (req, res)
{

    const data = req.body.data;

    if(!data || !data.clientId || !data.note ) { res.sendStatus(406); return;}

    mysqlConnectionPool.getConnection(function(err, connection) {

        var dt = datetime.create();

        //format to insert to the data base 2016-12-26 00:07:18
        var formatted = dt.format('Y-m-d H:M:S');

        var logSQL = "INSERT INTO `vinit_crm`.`block_unblock_client_note` (`client_id`, `user_id`, `note`, `loggedTime`, `blocked`) "
            + "VALUES ('?', '?', ?, ?, '0');"

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
router.post('/client/addnote',  function (req, res) {

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

//get client history limited - last 20
router.get('/client/data/:clientId/history', function (req, res, next) {

    const SQL = "select * from note_history"  + " WHERE client_id = " + req.params.clientId
        + " union select * from till_history "  + " WHERE client_id = " + req.params.clientId
        + " union select * from client_blocked_history "  + " WHERE client_id = " + req.params.clientId
        + " union select * from client_unblocked_history "  + " WHERE client_id = " + req.params.clientId
        + " union select * from client_branch_add_history "  + " WHERE client_id = " + req.params.clientId
        + " union select * from client_branch_remove_history "  + " WHERE client_id = " + req.params.clientId
        + " union select * from client_product_added_history "  + " WHERE client_id = " + req.params.clientId
        + " union select * from client_product_removed_history "  + " WHERE client_id = " + req.params.clientId

        + " ORDER BY `loggedTimeStamp` DESC"
        + " LIMIT 20";


    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db view");
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

//get ticket problem types
router.get('/tickets/problemtypes', function (req, res, next) {

    const SQL = "select * from problem_types" ;


    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db view");
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

//get ticket priorities
router.get('/tickets/priorities', function (req, res, next) {

    const SQL = "select * from priorities" ;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db view");
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

//get ticket ticket swim lane status typs
router.get('/tickets/status-types', function (req, res, next) {

    const SQL = "select * from ticketSwimlane" ;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db view");
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

//get developers
router.get('/developers', function (req, res, next) {

    const SQL = "select * from developers" ;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db view");
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

/* screanshot uploading with multer middleware*/
const screenshotStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../uploads/screenshots/');
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

const screenshotUpload = multer(
    {
        storage: screenshotStorage,
        limits: {fileSize: 50000000}
    }
);

const screenshotUploader = screenshotUpload.fields([{
    name: 'screenshot',
    maxCount: 1
}]);

// route for adding a ticket
router.post('/add-ticket', screenshotUploader, function (req, res) {

    const ticket = req.body;

    if (Array.isArray(req.files.screenshot) && req.files.screenshot.length > 0) {
        ticket.screenShotFileName =  req.files.screenshot[0].filename;
    }

    var dt = datetime.create();

    //format to insert to the data base 2016-12-26 00:07:18
    var formatted = dt.format('Y-m-d H:M:S');


    //swimlane status id = 1 (OPEN) is hardcoded.
    var SQL = "INSERT INTO `vinit_crm`.`tickets` (`ticket_id`, `swimlane_status_id`, `client_id`, `summary`, `description`, `problem_type_id`, `priority_id`, `assignee_id`, `sceenshot_name`, `due_date`, `user_id`,  `till_id`, `added_date_time`)"
        + " VALUES (NULL, '1', ?, ?, ?, ?, ?, ?, ?, ? , '?' , ? , ?); ";
    var values = [ticket.clientId, ticket.summary, ticket.problemDescription, ticket.selectedProblemTypeId, ticket.selectedPriority, ticket.selectedAssigneeId, ticket.screenShotFileName,  ticket.dueDate, req.decoded.uid, ticket.selectedTillId, formatted];

    SQL = mysql.format(SQL, values);

    //console.log(SQL);

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query( SQL,  function(err,rows, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting ticket',
                    message: err
                });
            }

            ticket.id = rows.insertId;

            // swimlane status is hard coded for the initial loging
            var LogSQL = "INSERT INTO `vinit_crm`.`ticket_swimlane_log` (`ticket_id`, `swimlane_status_id`, `loggedTime`,  `user_id` ) "
                + "VALUES ('?', '1', ?, '?');";

            var LogValues = [ticket.id, formatted, req.decoded.uid];

            LogSQL = mysql.format(LogSQL, LogValues);

            connection.query( LogSQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting ticket log',
                        message: err
                    });
                }
                connection.release();
                res.sendStatus(200);

            });
        });
    });
});

// route for updatinging a ticket
router.post('/update-ticket', screenshotUploader, function (req, res) {

    const ticket = req.body;
    var screenshotPresent = false;

    if (Array.isArray(req.files.screenshot) && req.files.screenshot.length > 0) {
        ticket.screenShotFileName =  req.files.screenshot[0].filename;
        screenshotPresent = true;
    }

    var dt = datetime.create();

    //format to insert to the data base 2016-12-26 00:07:18
    var formatted = dt.format('Y-m-d H:M:S');


    var screanshotSQL = "UPDATE `vinit_crm`.`tickets` SET " +
        " `description` = ?, " +
        " `problem_type_id` = ?," +
        " `summary` = ?," +
        " `priority_id` = ?," +
        " `assignee_id` = ?," +
        " `due_date` = ?," +
        " `till_id` = ?," +
        " `sceenshot_name` = ?" +

        " WHERE `tickets`.`ticket_id` = " + ticket.ticketId + ";";

    var screenshotValues = [
        ticket.problemDescription,
        ticket.selectedProblemTypeId,
        ticket.summary,
        ticket.selectedPriority,
        ticket.selectedAssigneeId,
        ticket.dueDate,
        ticket.selectedTillId,
        ticket.screenShotFileName
    ];

    var SQL = "UPDATE `vinit_crm`.`tickets` SET " +
        " `description` = ?, " +
        " `problem_type_id` = ?," +
        " `summary` = ?," +
        " `priority_id` = ?," +
        " `assignee_id` = ?," +
        " `due_date` = ?," +
        " `till_id` = ?" +

        " WHERE `tickets`.`ticket_id` = " + ticket.ticketId + ";";

    var values = [
        ticket.problemDescription,
        ticket.selectedProblemTypeId,
        ticket.summary,
        ticket.selectedPriority,
        ticket.selectedAssigneeId,
        ticket.dueDate,
        ticket.selectedTillId
    ];

    //    var values = [ ticket.clientId, ticket.summary, ticket.problemDescription, ticket.selectedProblemTypeId, ticket.selectedPriority,
// ticket.selectedAssigneeId, ticket.screenShotFileName,  ticket.dueDate, req.decoded.uid, ticket.selectedTillId];

    if(screenshotPresent){
        SQL = mysql.format(screanshotSQL, screenshotValues);
    }
    else{
        SQL = mysql.format(SQL, values);
    }


    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query( SQL,  function(err,rows, result) {
            if (err) {
                console.log(err);
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting ticket',
                    message: err
                });
            }

        });
        connection.release();
        res.sendStatus(200);

    });
});

//get client tickets
router.get('/client/data/:clientId/tickets', function (req, res, next) {

    const SQL = "SELECT * FROM ticket_data_view  " +
    " WHERE client_id = " + req.params.clientId + " ORDER BY    `added_date_time` DESC";


        /*"SELECT ticket_id, summary, swimlane_status, swimlane_color, due_date FROM `tickets`" +
        "inner join ticketswimlane on tickets.`swimlane_status_id` = ticketswimlane.swimlane_id" +
        " WHERE client_id = " + req.params.clientId + " ORDER BY `tickets`.`ticket_id` DESC";
*/
    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db: "+ error);
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

//get ticket data
router.get('/ticket/data/:ticketId', function (req, res, next) {

    //To do: reduce this joins by calling seperately for swimlane, priorities, problem types
    const SQL = "SELECT * FROM single_ticket_data_view "
        + " WHERE ticket_id = " + req.params.ticketId;

    ""

    // " client_id, problem_type_id," +
    // " priority_id," +
    // " swimlane_status_id" +


    //console.log(SQL);
    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if (results.length > 0) {

                res.json(results[0]);

            }
            else {

                res.statusCode = 200; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });
});

// route for change ticket priority
router.post('/ticket/change-priority', screenshotUploader, function (req, res) {

    const ticket = req.body;

    var dt = datetime.create();

    //format to insert to the data base 2016-12-26 00:07:18
    var formatted = dt.format('Y-m-d H:M:S');

    var SQL = "UPDATE `vinit_crm`.`tickets` SET `priority_id` = '" + ticket.selectedPriorityId + "'"
        + " WHERE `tickets`.`ticket_id` = '" + ticket.ticketId + "';";

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query( SQL,  function(err,rows, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting ticket',
                    message: err
                });
            }

            connection.release();
            res.sendStatus(200);

        });
    });
});

// route for change ticket priority
router.post('/ticket/change-status', screenshotUploader, function (req, res) {

    const ticket = req.body;

    var dt = datetime.create();

    //format to insert to the data base 2016-12-26 00:07:18
    var formatted = dt.format('Y-m-d H:M:S');

    var SQL = "UPDATE `vinit_crm`.`tickets` SET `swimlane_status_id` = '" + ticket.selectedSwimlaneStatusId + "'"
        + " WHERE `tickets`.`ticket_id` = '" + ticket.ticketId + "';";


    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query( SQL,  function(err,rows, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting ticket',
                    message: err
                });
            }


            var LogSQL = "INSERT INTO `vinit_crm`.`ticket_swimlane_log` (`ticket_id`, `swimlane_status_id`, `loggedTime`, `user_id` ) "
                + "VALUES (?, ?, ?, '?');";

            var LogValues = [ticket.ticketId, ticket.selectedSwimlaneStatusId, formatted, req.decoded.uid];

            LogSQL = mysql.format(LogSQL, LogValues);

            connection.query( LogSQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting priority ticket log',
                        message: err
                    });
                }
                connection.release();
                res.sendStatus(200);

            });
        });
    });
});

//get till data
router.get('/client/data/:clientId/purchased-items', function (req, res, next) {


    const SQL = "SELECT * FROM till "
        + "inner join `client_till_log` on till.till_id = client_till_log.till_id "
        + "inner join branch on till.branch_id = branch.branch_id "
        + "inner join products on till.product_Id = products.product_Id"
        + " WHERE till.client_id = " + req.params.clientId;

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

//get number of active tills
//To do move thic to commen
router.get('/tickets/number-of-active-tickets', function (req, res, next) {


    const SQL = "SELECT COUNT(*) AS active_tickets FROM `tickets` WHERE swimlane_status_id != 7";

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if (results.length > 0) {

                res.json(results[0]);

            }
            else {

                res.statusCode = 200; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });
});


//get number of expiring tills in next month and expired in last 30 days
//To do move thic to commen
router.get('/tickets/number-of-expiring-tills', function (req, res, next) {


    const SQL = "SELECT COUNT(*) as number_of_expiring_tills FROM `till` " +
        "WHERE `expiredate` between adddate(now(),-30) and adddate(now(),30)";

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db");
                return;
            }

            if (results.length > 0) {

                res.json(results[0]);

            }
            else {

                res.statusCode = 200; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });
});

//get overdue support tickets
//To do: move this to commen
router.get('/tickets/overdue-tickets', function (req, res, next) {


    const SQL = "SELECT ticket_id, summary, added_date_time swimlane_status ,	swimlane_color FROM `tickets` " +
        " join ticketswimlane on tickets.swimlane_status_id = ticketswimlane.swimlane_id" +
        " WHERE due_date < now() AND swimlane_status_id != 7 ";

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving overdue-tickets from to db");
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


module.exports = router;