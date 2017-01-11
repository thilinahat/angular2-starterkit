/**
 * Created by thilina on 1/10/17.
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
            } else if(decoded.role == 'DEVELOPER' || decoded.role == 'OPERATOR' || decoded.role == 'ADMIN'){
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

// route to get all products
router.get('/products',  function (req, res) {

    mysqlConnectionPool.getConnection(function (err, connection) {
        let sql = 'SELECT * FROM products';
        connection.query(sql, function (err, results) {
            if (err) {
                return res.sendStatus(400);
            } else {
                res.json(results);
            }
        });
    });
});

//get ticket priorities
router.get('/priorities', function (req, res, next) {

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
router.get('/status-types', function (req, res, next) {

    const SQL = "select * from ticketswimlane" ;

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

module.exports = router;