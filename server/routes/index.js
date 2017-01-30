var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../../config');

router.get('/', function(req, res, next){

    res.render('index.html');

});

module.exports = router;

