/**
 * Created by thilina on 12/18/16.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var config = require('../../config');

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
        cb(null, __dirname + '/../uploads/');
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
        client.logoFileName = req.files.logo[0].originalname;
    }

    mysqlConnectionPool.getConnection(function(err, connection) {

        // stage_id and blocked field is hard coded here
        let sql = 'INSERT INTO client ' +
            '(company_name, address, contact_person_name, web_site, stage_id, country, town, mlr_number, postal_code, business_registration, blocked, logo_file_name)' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let values = [client.company,client.address,client.contactPerson,client.website,1,client.country,client.town,client.mlr,client.postalCode,client.businessRegistration, 0,client.logoFileName];

        connection.query( sql, values, function(err, rows, fields) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting client general data',
                    message: err
                });
            }

            client.id = rows.insertId;

            if(client.emails.length > 0){
                sql = "INSERT INTO client_mail (client_id, mail) VALUES ?";
                values.length = 0;
                client.emails.forEach(mail => {
                   values.push([client.id, mail]);
                });
                connection.query(sql, [values], function(err) {
                    if (err) throw err;
                });
            } if(client.phones.length > 0){
                sql = "INSERT INTO client_phone (client_id, phone) VALUES ?";
                values.length = 0;
                client.phones.forEach(phone => {
                    values.push([client.id, phone]);
                });
                connection.query(sql, [values], function(err) {
                    if (err) throw err;
                });
            } if(client.faxes.length > 0){
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
        });
    });
});

router.get('/client/data/:clientId', function (req, res, next) {

    var SQL = 'SELECT * FROM `client`  WHERE client_id = ' + req.params.clientId;

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

});

router.get('/client/data/:clientId/name', function (req, res, next) {

    var SQL = 'SELECT company_name, client_id FROM `client` WHERE client_id =  ' + req.params.clientId;

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

});

router.get('/client/searchdata', function (req, res,next) {

    var SQL = 'SELECT `company_name`, `client_id` FROM `client`;';

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

});

router.get('/client/data/:clientId/mail', function (req, res, next) {

    var SQL = 'SELECT * FROM `client_mail` WHERE client_id =  ' + req.params.clientId;

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

});

router.get('/client/data/:clientId/phone', function (req, res, next) {

    var SQL = 'SELECT * FROM `client_phone` WHERE client_id =  ' + req.params.clientId;

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

});

router.get('/client/data/:clientId/fax', function (req, res, next) {

    var SQL = 'SELECT * FROM `client_fax` WHERE client_id =  ' + req.params.clientId;

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

});

module.exports = router;