var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var AuthService = require('../services/authService');
var config = require('../config');

var AUTHENTICATED = false;

router.post('/authenticate', function(req, res, next){
    const user = req.body.user;
    AuthService.verifyUser(user).then(response => {
        res.cookie('CRM_COOKIE', response.token, { maxAge: 3600 * 24 * 1000});
        res.status(200).json({
            redirectURL: response.redirectURL
        });
    }, error => {
        res.sendStatus(403);
    })
});

router.post('/verify/user', function(req, res, next){
    const token = req.cookies['CRM_COOKIE'];
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
            "use strict";
            if (err) {
                res.status(403).json({
                    success: false,
                    message: 'Failed to Authenticate Token.'
                });
            } else
                res.send({
                    userRole: decodedToken.role
                });
        });
    } else {
        // if there is no token
        // return an error
        res.status(403).json({
            success: false,
            message: 'No Token Provided.'
        });
    }

});

router.get('/', function(req, res, next){

    authenticate(req, res, next);

    res.render('index.html');

});

module.exports = router;

authenticate = function (req, res, next) {
    if(!AUTHENTICATED){
        //res.send('Authentication required !')
    }
}
