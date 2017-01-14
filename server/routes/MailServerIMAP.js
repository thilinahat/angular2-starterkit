/**
 * This uses IMAP client implementation on
 * https://github.com/mscdex/node-imap
 */
var Imap = require('imap');
var inspect = require('util').inspect;
var express = require('express');
var router = express.Router();
var config = require('../../config');
var mail_id = 0;

var data = {
    "headers":[]
};

router.get('/', function (req, res, next) {
    res.json(data.headers);
});

router.get('/i',function (req,res,next) {
    getUnreadMessages(function (dat,err) {
        res.json(dat);
    });
})

process.on('uncaughtException', function (err) {
    console.log("internal error : " + err);
});

var imap = new Imap({
    user: config.email.imap_un,
    password: config.email.imap_pw,
    host: config.email.imap_server,
    port: config.email.imap_port,
    tls: true
});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

imap.once('error', function(err) {
    console.log("sdf " + err);
});


imap.once('end', function() {
    console.log('Connection ended');
    console.log(data.headers);
});

function getUnreadMessages(callback) {
    imap.connect();
    var topic;
    var sender;

    imap.once('ready',function () {
        openInbox(function (err,box) {
            if(err) throw err;
            imap.search([['ALL'],['FROM','chamupathi2008@gmail.com']],function (err,results) {
                if(err) throw err;
                var f = imap.fetch(results, { bodies: ['HEADER.FIELDS (FROM SUBJECT)','TEXT'] });
                var msgJson = { // variable to store all email details
                    "messages":[]
                }
                f.on('message',function (msg, seqno) {
                    msg.on('body',function (stream,info) {
                        var buffer = '', count = 0;
                        stream.on('data',function (chunk) {
                            count += chunk.length;
                            buffer += chunk.toString('utf8');
                        });

                        stream.once('end',function () {
                            var head = Imap.parseHeader(buffer);
                            if(info.which === 'HEADER.FIELDS (FROM SUBJECT)')
                            {
                                topic = head.subject;
                                sender = head.from;
                            }
                            if (info.which === 'TEXT'){
                                var fistline = buffer.split('\n')[0]; // get first line
                                var msgBody = buffer.split(fistline)[2]; // get the body with html
                                var msgLines = msgBody.split('\n');
                                msgLines.splice(0,2);
                                msgLines.splice(msgLines.length-2,2); // remove last line
                                var msg = msgLines.join('\n'); // recreate msg
                                ++mail_id;
                                var singleMail = {
                                    topic : topic,
                                    body: msg,
                                    id: mail_id
                                };

                                msgJson["messages"].push(singleMail);

                            }
                        });
                    });

                });
                f.once('error', function(err) {
                    console.log('Fetch error: ' + err);
                });
                f.once('end', function() {
                    console.log('Done fetching all messages!');
                    imap.end();
                    callback(msgJson.messages);
                });
            });
        });
    });
}
module.exports = router;
