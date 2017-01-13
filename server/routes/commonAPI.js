/**
 * Created by thilina on 1/10/17.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var moment = require('moment');
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

// route to insert comments
router.post('/comment/add',  function (req, res) {

    const comment = req.body.comment;
    const time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    mysqlConnectionPool.getConnection(function (err, connection) {
        let sql = 'INSERT INTO comments' +
            '  ( ticket_id, sender_name, sender_role, message, timestamp )' +
            ' VALUES (?, ?, ?, ?, ?)';
        let values = [comment.ticketID, req.decoded.name, req.decoded.role, comment.comment, time];
        connection.query(sql, values, function (err, rows, fields) {
            if (err) {
                console.log(err);
                return res.status(406).json({
                    status: 'Failed to set comment',
                    message: err
                });
            } else {
                res.status(200).json({
                    sender_name: req.decoded.name,
                    sender_role: req.decoded.role,
                    message: comment.comment,
                    timestamp: time
                });
            }
        });
    });
});

//get comments of a ticket
router.get('/comments/:ticketID', function (req, res, next) {

    const SQL = "select * from comments WHERE ticket_id=" + req.params.ticketID ;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log(error);
                res.json({
                    message: 'Error While retrieving comments',
                    error: error
                });
            } else {
                res.json(results);
            }

        });

        connection.release();
    });
});

// get all ticket data
router.get('/ticket/data/:ticketId', function (req, res, next) {

    //TODO: reduce this joins by calling seperately for swimlane, priorities, problem types
    const SQL = "SELECT * FROM single_ticket_data_view "
        + " WHERE ticket_id = " + req.params.ticketId;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {
                console.log(error);
                res.status(406).json({
                    success: false,
                    message: error
                });
            } else if(results[0] && results[0].assignee_id == req.decoded.uid){
                    res.json(results[0]);
            } else{
                res.status(406).json({
                    success: false,
                    message: 'not auhtorized'
                });
            }


        });

        connection.release();
    });
});


/*
* ***********************************************************************************************************
*                                                                                                           *
*                                                                                                           *
*  FOLLOWING ROUTES ARE ACCESSIBLE BY ALL OPERATORS, ADMINS AND ONLY THE DEVELOPER ASSIGNED TO THAT TICKET  *
*                                                                                                           *
*                                                                                                           *
* ***********************************************************************************************************/


// middleware protect ticket data related routes
router.use(function (req, res, next) {

    if( req.decoded.role == 'OPERATOR' || req.decoded.role == 'ADMIN' || req.decoded.uid == req.body.ticket.assigneeId)
        next();
    else
        return res.status(403).send({
            success: false,
            message: 'not authorized'
        });
});

// route to update ticket swimlane status
router.post('/ticket/change-status', function (req, res) {

    const ticket = req.body.ticket;

    var SQL = "UPDATE `vinit_crm`.`tickets` SET `swimlane_status_id` = '" + ticket.selectedSwimlaneStatusId + "'"
        + " WHERE `tickets`.`ticket_id` = '" + ticket.ticketId + "';";

    mysqlConnectionPool.getConnection(function(err, connection) {
        //console.log(SQL);
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

            var LogValues = [ticket.ticketId, ticket.selectedSwimlaneStatusId, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), req.decoded.uid];

            LogSQL = mysql.format(LogSQL, LogValues);

            //console.log(LogSQL);
            connection.query( LogSQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting to swimlane ticket log',
                        message: err
                    });
                }
                connection.release();
                res.sendStatus(200);

            });
        });
    });
});

// route to update ticket priority
router.post('/ticket/change-priority', function (req, res) {

    const ticket = req.body.ticket;

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

module.exports = router;