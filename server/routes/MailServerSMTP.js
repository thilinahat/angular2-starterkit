/**
 * Created by tharakamd on 10/12/2016.
 * This uses SMTP client using
 * npm install nodemailer
 */

var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://dilanreader@gmail.com:gts5610k@smtp.gmail.com');

/**
 * routing
 */
router.post('/', function (req, res, next) {
    var reqBody = req.body;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Dilan Tharaka" <dilanreader@gmail.com>', // sender address
        to: 'tharakamd6@gmail.com', // list of receivers
        subject: reqBody.title, // Subject line
        text: reqBody.body, // plaintext body
        html: "<b>" + reqBody.body  + "</b>" // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    // sending response
    res.json({
        title: "title",
        body: "body"
    });
});

module.exports = router;