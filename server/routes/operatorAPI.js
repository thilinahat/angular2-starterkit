/**
 * Created by thilina on 12/18/16.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
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


// route for adding a client
router.post('/add-client', function (req, res, next) {
    const client = req.body.client;
    console.log(client);
    res.sendStatus(200);
});


module.exports = router;