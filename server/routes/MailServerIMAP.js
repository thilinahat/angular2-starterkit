/**
 * This uses IMAP client implementation on
 * https://github.com/mscdex/node-imap
 */
var Imap = require('imap');
var inspect = require('util').inspect;
var express = require('express');
var router = express.Router();


var data = {
    "headers":[]
};

router.get('/', function (req, res, next) {
    res.json(data.headers);
});

router.get('/i',function (req,res,next) {
    getUnreadMessages(function (dat) {
        res.json(dat);
    });
})

var imap = new Imap({
    user: 'chamupathi2008@gmail.com',
    password: 'Toshiba@2',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

imap.once('error', function(err) {
    console.log(err);
});

imap.once('end', function() {
    console.log('Connection ended');
    console.log(data.headers);
});

function getUnreadMessages(callback) {
    imap.connect();
    imap.once('ready',function () {
        openInbox(function (err,box) {
            if(err) throw err;
            imap.search([['ALL'],['FROM','tharakamd6@gmail.com']],function (err,results) {
                if(err) throw err;
                var f = imap.fetch(results, { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
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
                            if (info.which === 'TEXT'){

                                var fistline = buffer.split('\n')[0]; // get first line
                                var msgBody = buffer.split(fistline)[2]; // get the body with html
                                var msgLines = msgBody.split('\n');
                                msgLines.splice(0,2);
                                msgLines.splice(msgLines.length-2,2); // remove last line
                                var msg = msgLines.join('\n'); // recreate msg

                                var singleMail = {
                                    topic : "Hello World",
                                    body: msg
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
