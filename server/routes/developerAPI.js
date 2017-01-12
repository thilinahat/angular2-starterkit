/**
 * Created by thilina on 1/7/17.
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
            } else if(decoded.role == 'DEVELOPER'){
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

// route to get tickets assigned to developer
router.post('/tickets',  function (req, res) {

    const state = req.body.state;  // state of product, priority, status

    let productFilter = 1;
    let priorityFilter = 1;
    let statusFilter = 1;

    if(state.productID != "Any")
        productFilter = '`products`.`product_Id`=' + state.productID;
    if(state.priorityID != "Any")
        priorityFilter = '`tickets`.`priority_id`=' + state.priorityID;
    if(state.statusID != "Any")
        statusFilter = '`tickets`.`swimlane_status_id`=' + state.statusID;

    const sql = 'SELECT `tickets`.`summary`, `tickets`.`description`, `tickets`.`ticket_id`, `priorities`.`priority_name`,`ticketswimlane`.`swimlane_status`, `problem_types`.`problem_type_name`' +
        ' FROM `tickets` INNER JOIN `till` ON `tickets`.`till_id`=`till`.`till_id` ' +
        ' INNER JOIN `products` ON `till`.`product_Id`=`products`.`product_Id` ' +
        ' INNER JOIN `priorities` ON `tickets`.`priority_id`= `priorities`.`priority_id` ' +
        ' INNER JOIN `ticketswimlane` ON `tickets`.`swimlane_status_id`=`ticketswimlane`.`swimlane_id` ' +
        ' INNER JOIN `problem_types` ON `tickets`.`problem_type_id`=`problem_types`.`problem_type_id`' +
        ' WHERE `tickets`.`assignee_id`=1 AND ' + productFilter +  ' AND ' + priorityFilter + ' AND ' +  statusFilter;

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