/**
 * Created by tharakamd on 10/12/2016.
 * This uses SMTP client using
 * npm install nodemailer
 */

var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var config = require('../../config');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://'+ config.email.smtp_un
     +':'+ config.email.smtp_pw +'@' + config.email.smtp_server);

/**
 * routing
 */
router.post('/', function (req, res, next) {
    var reqBody = req.body;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Dilan Tharaka" <dilantharakamd6@yahoo.com>', // sender address
        to: 'chamupathi2008@gmail.com', // list of receivers
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