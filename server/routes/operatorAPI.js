/**
 * Created by thilina on 12/18/16.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'testingUser',
    password : '1234',
    database : 'vinit_crm'
});

connection.connect();


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


// route for adding a client
router.post('/add-client', function (req, res, next) {
    const client = req.body.client;
    console.log(client);
    res.sendStatus(200);
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