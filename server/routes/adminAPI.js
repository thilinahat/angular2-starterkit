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

// middleware protect api routes
// TODO : this need to be protected
/*
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
});*/

router.get('/add-operator',  function (req, res) {

    var user = {
        id: 1,
        username: config.operator.usernamePrefix + "_" + 1,
        password: config.operator.passwordPrefix + "_" + 1,
        role: config.roles.operator
    };

    UserService.addUser(user).then(response => {
        res.status(200).json({
            message: 'Operator Created',
            username: 'CRM_OPERATOR_USERNAME_1',
            password: 'CRM_OPERATOR_PASSWORD_1'
        });
    }, err => {
        return res.status(406).json({
            status: 'Failed to create operator',
            message: err
        });
    });
});


module.exports = router;