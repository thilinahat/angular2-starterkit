/**
 * Created by thilina on 12/25/16.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var config = require('../../config');
var UserService = require('../services/userService');
var router = express.Router();
var request = require('request');

router.get('/add-admin',  function (req, res) {

    var user = {
        companyId: 1,
        name: 'admin',
        role: config.roles.admin
    };

    UserService.addOperatorOrDeveloperOrAdmin(user).then(response => {
        res.status(200).json({
            message: 'Admin Created',
            username: response.username,
            password: response.password
        });
    }, err => {
        return res.status(406).json({
            status: 'Failed to create admin',
            message: err
        });
    });
});

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
            } else if(decoded.role == 'ADMIN'){
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

// route to add operators, developers
router.post('/user/add',  function (req, res) {

    const user = req.body.user;

    UserService.addOperatorOrDeveloperOrAdmin(user).then(response => {
        const mail = {
            sending_to: user.email,
            title: "VinIT CRM Login Credentials",
            body: "Your Username is " + response.username + '.\n Your Password is ' + response.password
        };
        request({  // mailing
            method: 'POST',
            url: "http://localhost:8080/mailsend",
            body: mail,
            json: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }, (error, profiles, body) => {
            if (error)
                console.log(error);
        });
        res.status(200).json({
            message: user.role + ' ' + user.name + ' Created Successfully',
        });
    }, err => {
        return res.status(406).json({
            status: 'Failed to create ' + user.role,
            message: err
        });
    });
});

// route to get all unblocked users of a specific role
router.get('/users/unblocked/:role',  function (req, res) {
    const table = req.params.role;
    mysqlConnectionPool.getConnection(function (err, connection) {
        const sql = 'SELECT name FROM ' + table + ' WHERE blocked=false';
        connection.query(sql, function (err, results) {
            if (err) {
                return res.sendStatus(400);
            } else {
                res.json(results);
            }
        });
    });
});

// route to get all blocked users of a specific role
router.get('/users/blocked/:role',  function (req, res) {
    const table = req.params.role;
    mysqlConnectionPool.getConnection(function (err, connection) {
        const sql = 'SELECT name FROM ' + table + ' WHERE blocked=true';
        connection.query(sql, function (err, results) {
            if (err) {
                return res.sendStatus(400);
            } else {
                res.json(results);
            }
        });
    });
});

// route to get developers
router.get('/users/developers',  function (req, res) {
    mysqlConnectionPool.getConnection(function (err, connection) {
        const sql = 'SELECT * FROM developers;';
        connection.query(sql, function (err, results) {
            if (err) {
                return res.sendStatus(400);
            } else {
                res.json(results);
            }
        });
    });
});

// route to get developers
router.get('/users/operators',  function (req, res) {
    mysqlConnectionPool.getConnection(function (err, connection) {
        const sql = 'SELECT * FROM operators;';
        connection.query(sql, function (err, results) {
            if (err) {
                return res.sendStatus(400);
            } else {
                res.json(results);
            }
        });
    });
});

// route to block operators, developers
router.post('/user/block',  function (req, res) {
    const user = req.body.user;
    UserService.blockOperatorOrDeveloperOrAdmin(user).then(response => {
        res.status(200).json({
            message: user.name + ' Blocked Successfully'});
    }, err => {
        return res.status(406).json({
            status: 'Failed to block ' + user.name,
            message: err
        });
    });
});

// route to unblock operators, developers
router.post('/user/unblock',  function (req, res) {
    const user = req.body.user;
    UserService.unblockOperatorOrDeveloperOrAdmin(user).then(response => {
        res.status(200).json({
            message: user.name + ' Unblocked Successfully'});
    }, err => {
        return res.status(406).json({
            status: 'Failed to unblock ' + user.name,
            message: err
        });
    });
});


// route to get all products moved to common api

// route to add products
router.post('/product/add',  function (req, res) {

    const product = req.body.product;

    mysqlConnectionPool.getConnection(function (err, connection) {
        let sql = 'INSERT INTO products' +
            '  ( name, description )' +
            ' VALUES (?, ?)';
        let values = [product.name, product.description];
        connection.query(sql, values, function (err, rows, fields) {
            if (err) {
                return res.status(406).json({
                    status: 'Failed to create Product',
                    message: err
                });
            } else {
                res.status(200).json({
                    message: ' Product Created Successfully'
                });
            }
        });
    });
});

// route to edit products
router.post('/product/edit',  function (req, res) {

    const product = req.body.product;

    mysqlConnectionPool.getConnection(function (err, connection) {
        let sql = 'UPDATE products SET description = ? WHERE name = ?';
        let values = [product.description, product.product];
        connection.query(sql, values, function (err, results) {
            if (err) {
                return res.status(406).json({
                    status: 'Failed to update Product',
                    message: err
                });
            } else {
                res.status(200).json({
                    message: ' Product Updated Successfully'
                });
            }
        });
    });
});

//route to get available time
router.get('/client/data/:clientId/supportTime', function (req, res, next) {

    const SQL = "SELECT support_time FROM client  " +
        " WHERE client_id = " + req.params.clientId ;


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

//add-time
// route to edit productsadd-time
router.post('/client/add-time',  function (req, res) {

    const data = req.body;

    var currentTime;


    const SQL = "SELECT support_time FROM client  " +
        " WHERE client_id = " + data.clientId ;


    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db: "+ error);
                return;
            }

            if (results.length > 0) {

                if(results[0].support_time == null){
                    currentTime = 0
                }
                else{
                    currentTime = results[0].support_time;
                }

                let sql = 'UPDATE `client` SET `support_time` = ' + (parseInt( data.addingTime )*60 + currentTime ).toString() + ' WHERE `client`.`client_id` = ' + data.clientId +';';

                connection.query(sql,  function (err, results) {
                    if (err) {
                        return res.status(406).json({
                            status: 'Failed to update Client',
                            message: err
                        });
                    } else {
                        res.status(200).json({
                            message: ' Client Updated Successfully'
                        });
                    }
                });

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