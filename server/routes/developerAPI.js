/**
 * Created by thilina on 1/7/17.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var async = require('async');
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

// route to get tickets and ticket count assigned to developer
router.post('/tickets/with-count',  function (req, res) {

    const state = req.body.state;  // state of product, priority, status
    const TICKETS_PER_PAGE = 2;

    let productFilter = 1;
    let priorityFilter = 1;
    let statusFilter = 1;

    if(state.productID != "Any")
        productFilter = '`products`.`product_Id`=' + state.productID;
    if(state.priorityID != "Any")
        priorityFilter = '`tickets`.`priority_id`=' + state.priorityID;
    if(state.statusID != "Any")
        statusFilter = '`tickets`.`swimlane_status_id`=' + state.statusID;

    const offset = 0;

    async.parallel({
        tickets: function(callback) {

            const sql = 'SELECT `tickets`.`summary`, ' +
                '`tickets`.`description`, `tickets`.`ticket_id`,' +
                ' `priorities`.`priority_name`, `priorities`.`color`,' +
                ' `ticketswimlane`.`swimlane_status`, `ticketswimlane`.`swimlane_color`,' +
                ' `problem_types`.`problem_type_name`, `problem_types`.`problem_type_color`,' +
                ' concat(date(`tickets`.`added_date_time`),"") AS `added_date_time`, ' +
                ' `client`.`client_id`, `client`.`company_name`' +
                ' FROM `tickets` INNER JOIN `till` ON `tickets`.`till_id`=`till`.`till_id` ' +
                ' INNER JOIN `products` ON `till`.`product_Id`=`products`.`product_Id` ' +
                ' INNER JOIN `priorities` ON `tickets`.`priority_id`= `priorities`.`priority_id` ' +
                ' INNER JOIN `ticketswimlane` ON `tickets`.`swimlane_status_id`=`ticketswimlane`.`swimlane_id` ' +
                ' INNER JOIN `problem_types` ON `tickets`.`problem_type_id`=`problem_types`.`problem_type_id`' +
                ' INNER JOIN `client` ON `tickets`.`client_id`=`client`.`client_id`' +
                ' WHERE `tickets`.`assignee_id`=' + req.decoded.uid +  ' AND ' + productFilter +  ' AND ' + priorityFilter + ' AND ' +  statusFilter +
                ' ORDER BY `tickets`.`ticket_id` DESC ' +
                'LIMIT ' + offset + ',' + TICKETS_PER_PAGE;

            mysqlConnectionPool.getConnection(function(err, connection) {
                connection.query(sql, function (error, results) {
                    if (error) {
                        console.log(error);
                        callback(error, null);
                    } else
                        callback(null, results);

                });

                connection.release();
            });
        },
        count: function(callback) {

            const sql = 'SELECT  COUNT(`tickets`.`ticket_id`) as count ' +
                ' FROM `tickets` INNER JOIN `till` ON `tickets`.`till_id`=`till`.`till_id` ' +
                ' INNER JOIN `products` ON `till`.`product_Id`=`products`.`product_Id` ' +
                ' INNER JOIN `priorities` ON `tickets`.`priority_id`= `priorities`.`priority_id` ' +
                ' INNER JOIN `ticketswimlane` ON `tickets`.`swimlane_status_id`=`ticketswimlane`.`swimlane_id` ' +
                ' INNER JOIN `problem_types` ON `tickets`.`problem_type_id`=`problem_types`.`problem_type_id`' +
                ' WHERE `tickets`.`assignee_id`=' + req.decoded.uid + ' AND ' + productFilter +  ' AND ' + priorityFilter + ' AND ' +  statusFilter ;

            mysqlConnectionPool.getConnection(function(err, connection) {
                connection.query(sql, function (error, results) {
                    if (error) {
                        console.log(error);
                        callback(error, null);
                    } else
                        callback(null, Math.ceil(results[0].count/TICKETS_PER_PAGE));

                });

                connection.release();
            });
        }
    }, function(err, results) {  // after matching social media and and government profiles
        if (err)
            res.send(err);

        res.json(results);
    });
});

// route to get tickets assigned to developer
router.post('/tickets',  function (req, res) {

    const state = req.body.state;  // state of product, priority, status
    const TICKETS_PER_PAGE = 2;

    let productFilter = 1;
    let priorityFilter = 1;
    let statusFilter = 1;

    if(state.productID != "Any")
        productFilter = '`products`.`product_Id`=' + state.productID;
    if(state.priorityID != "Any")
        priorityFilter = '`tickets`.`priority_id`=' + state.priorityID;
    if(state.statusID != "Any")
        statusFilter = '`tickets`.`swimlane_status_id`=' + state.statusID;

    const offset = (state.page - 1) * TICKETS_PER_PAGE;

    const sql = 'SELECT `tickets`.`summary`, `tickets`.`description`, `tickets`.`ticket_id`,' +
        ' `priorities`.`priority_name`,`priorities`.`color`, `ticketswimlane`.`swimlane_status`,' +
        ' `ticketswimlane`.`swimlane_color`, `problem_types`.`problem_type_name`, `problem_types`.`problem_type_color`, ' +
        ' `client`.`client_id`, `client`.`company_name`, ' +
        ' concat(date(`tickets`.`added_date_time`),"") AS `added_date_time` ' +
        ' FROM `tickets` INNER JOIN `till` ON `tickets`.`till_id`=`till`.`till_id` ' +
        ' INNER JOIN `products` ON `till`.`product_Id`=`products`.`product_Id` ' +
        ' INNER JOIN `priorities` ON `tickets`.`priority_id`= `priorities`.`priority_id` ' +
        ' INNER JOIN `ticketswimlane` ON `tickets`.`swimlane_status_id`=`ticketswimlane`.`swimlane_id` ' +
        ' INNER JOIN `problem_types` ON `tickets`.`problem_type_id`=`problem_types`.`problem_type_id`' +
        ' INNER JOIN `client` ON `tickets`.`client_id`=`client`.`client_id`' +
        ' WHERE `tickets`.`assignee_id`=' + req.decoded.uid + ' AND ' + productFilter +  ' AND ' + priorityFilter + ' AND ' +  statusFilter +
        ' ORDER BY `tickets`.`ticket_id` DESC ' +
        'LIMIT ' + offset + ',' + TICKETS_PER_PAGE;

    mysqlConnectionPool.getConnection(function(err, connection) {
        connection.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                res.status(400).json({
                    error: error
                });
            } else
                res.json(results);

        });

        connection.release();
    });
});

module.exports = router;