var express = require('express');
var router = express.Router();

var AUTHENTICATED = false;

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
