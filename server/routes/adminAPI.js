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


router.get('/add-admin',  function (req, res) {

    var user = {
        id: 1,
        username: config.admin.usernamePrefix,
        password: config.admin.passwordPrefix,
        role: config.roles.admin
    };

    UserService.addUser(user).then(response => {
        res.status(200).json({
            message: 'Admin Created',
            username: 'CRM_ADMIN',
            password: 'CRM_ADMIN'
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

router.post('/user/add',  function (req, res) {

    const user = req.body.user;

    UserService.addUser(user).then(response => {
        res.status(200).json({
            message: user.role + ' Created Successfully',
            username: response.username,
            password: response.password
        });
    }, err => {
        return res.status(406).json({
            status: 'Failed to create ' + user.role,
            message: err
        });
    });
});

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