/**
 * Created by thilina on 1/24/17.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
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
router.get('/:fileName',  function (req, res) {
    const file = req.params.fileName;
    // do the authentication here
    // db entry should include the file name, client id
    // all operators and admins can view the contract files
    if(req.decoded.role == 'OPERATOR' || req.decoded.role == 'ADMIN')
        res.sendfile(path.join(__dirname, '../uploads/contracts/' + file));
    else if(1){ // check with db here

    } else{
        res.status(403).send({
            success: false,
            message: 'not authorized'
        });
    }
});

module.exports = router;