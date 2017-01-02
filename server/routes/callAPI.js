/**
 * Created by tharakamd on 12/29/16.
 */
var express = require('express');

var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var config = require('../../config')
var dateFormat = require('dateformat');

var router = express.Router();

router.post('/addnew',function (req,res) {
    const callDetails = req.body;
    mysqlConnectionPool.getConnection(function(err, connection) {
        var SQL = "INSERT INTO `vinit_crm`.`call_record` (`start_time`, `end_time`,`description`,`type`,`time_duration`,`client_id`) " +
            "VALUES (?, ?, ?, ?, ?, ?);";
        var values = [callDetails.start_time, callDetails.end_time, callDetails.description, callDetails.type, callDetails.time_duration, callDetails.client_id];

        SQL = mysql.format(SQL, values);

        connection.query( SQL,  function(err, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting call data',
                    message: err
                });
            }

            connection.release();
            res.sendStatus(200);

        });
    });
});

router.get('/summary',function (req,res,next) {
    mysqlConnectionPool.getConnection(function(err, connection) {

        // creating dates
        var today = new Date();
        var day_of_the_week = today.getDay();
        var day_of_the_month = today.getDate();
        var fist_day_of_the_week = day_of_the_month - day_of_the_week;

        var sql_this_week = "'y-m-d' AND 'yy-mm-dd'"
            .replace('y', today.getFullYear())
            .replace('m', today.getMonth() + 1)
            .replace('d', fist_day_of_the_week)
            .replace('yy', today.getFullYear())
            .replace('mm', today.getMonth() + 1)
            .replace('dd',today.getDate());

        var sql_this_month = "'y-m-d' AND 'yy-mm-dd'"
            .replace('y', today.getFullYear())
            .replace('m', today.getMonth() + 1)
            .replace('d', 1)
            .replace('yy', today.getFullYear())
            .replace('mm', today.getMonth() + 1)
            .replace('dd',today.getDate());
        // end creating dates

        // variable to store results
        var details = {};

        // query to get summary of this week incoming
        var SQL = "SELECT SUM(time_duration) as duration " +
            "FROM `call_record` WHERE start_time BETWEEN " + sql_this_week +" AND type = 'Incoming' AND client_id = 1";

        connection.query(SQL, function (error, results) {
            if (error) {
                console.log("error while retrieving from to db call data fetch");
                res.statusCode = 500;
                res.send();
                return;
            }

            if (results.length > 0) {
                var result = results[0];
                if(result.duration == null)
                    result.duration = '0:0:0';
                else{
                    var t = parseInt(result.duration) % 60;
                    result.duration = parseInt(result.duration) / 60;
                    t = parseInt(result.duration) % 60 + ":" + t;
                    result.duration = parseInt(result.duration) / 60;
                    t = parseInt(result.duration) % 60 + ":" + t;
                    result.duration = t;
                }
                details.incomingThisWeek = result.duration;
            }
            else {
                details.incomingThisWeek =  '0:0:0';
            }

            // query to get summary of this week outgoing
            var SQL = "SELECT SUM(time_duration) as duration " +
                "FROM `call_record` WHERE start_time BETWEEN " + sql_this_week +" AND type = 'Outgoing' AND client_id = 1";
            connection.query(SQL, function (error, results) {
                if (error) {
                    console.log("error while retrieving from to db call data fetch");
                    res.statusCode = 500;
                    res.send();
                    return;
                }

                if (results.length > 0) {
                    var result = results[0];
                    if(result.duration == null)
                        result.duration =  '0:0:0';
                    else{
                        var t = parseInt(result.duration) % 60;
                        result.duration = parseInt(result.duration) / 60;
                        t = parseInt(result.duration) % 60 + ":" + t;
                        result.duration = parseInt(result.duration) / 60;
                        t = parseInt(result.duration) % 60 + ":" + t;
                        result.duration = t;
                    }
                    details.outgoingThisWeek = result.duration;
                }
                else {
                    details.outgoingThisWeek =  '0:0:0';
                }

                // query to get summary of this month incoming
                var SQL = "SELECT SUM(time_duration) as duration " +
                    "FROM `call_record` WHERE start_time BETWEEN " + sql_this_month +" AND type = 'Incoming' AND client_id = 1";
                connection.query(SQL, function (error, results){
                    if (error) {
                        console.log("error while retrieving from to db call data fetch");
                        res.statusCode = 500;
                        res.send();
                        return;
                    }

                    if (results.length > 0) {
                        var result = results[0];
                        if(result.duration == null)
                            result.duration =  '0:0:0';
                        else{
                            var t = parseInt(result.duration) % 60;
                            result.duration = parseInt(result.duration) / 60;
                            t = parseInt(result.duration) % 60 + ":" + t;
                            result.duration = parseInt(result.duration) / 60;
                            t = parseInt(result.duration) % 60 + ":" + t;
                            result.duration = t;
                        }
                        details.incomingThisMonth = result.duration;
                    }
                    else {
                        details.incomingThisMonth =  '0:0:0';
                    }

                    // query to get summary of this month outgoing
                    var SQL = "SELECT SUM(time_duration) as duration " +
                        "FROM `call_record` WHERE start_time BETWEEN " + sql_this_month +" AND type = 'Outgoing' AND client_id = 1";
                    connection.query(SQL, function (error, results){
                        if (error) {
                            console.log("error while retrieving from to db call data fetch");
                            res.statusCode = 500;
                            res.send();
                            return;
                        }

                        if (results.length > 0) {
                            var result = results[0];
                            if(result.duration == null)
                                result.duration = '0:0:0';
                            else{
                                var t = parseInt(result.duration) % 60;
                                result.duration = parseInt(result.duration) / 60;
                                t = parseInt(result.duration) % 60 + ":" + t;
                                result.duration = parseInt(result.duration) / 60;
                                t = parseInt(result.duration) % 60 + ":" + t;
                                result.duration = t;
                            }
                            details.outgoingThisMonth = result.duration;
                        }
                        else {
                            details.outgoingThisMonth =  '0:0:0';
                        }

                        // incoming total
                        var SQL = "SELECT SUM(time_duration) as duration " +
                            "FROM `call_record` WHERE type = 'Incoming' AND client_id = 1";
                        connection.query(SQL, function (error, results){
                            if (error) {
                                console.log("error while retrieving from to db call data fetch");
                                res.statusCode = 500;
                                res.send();
                                return;
                            }

                            if (results.length > 0) {
                                var result = results[0];
                                if(result.duration == null)
                                    result.duration =  '0:0:0';
                                else{
                                    var t = parseInt(result.duration) % 60;
                                    result.duration = parseInt(result.duration) / 60;
                                    t = parseInt(result.duration) % 60 + ":" + t;
                                    result.duration = parseInt(result.duration) / 60;
                                    t = parseInt(result.duration) % 60 + ":" + t;
                                    result.duration = t;
                                }
                                details.incomingFull = result.duration;
                            }
                            else {
                                details.incomingFull =  '0:0:0';
                            }

                            // outgoing total
                            var SQL = "SELECT SUM(time_duration) as duration " +
                                "FROM `call_record` WHERE type = 'Outgoing' AND client_id = 1";
                            connection.query(SQL, function (error, results){
                                if (error) {
                                    console.log("error while retrieving from to db call data fetch");
                                    res.statusCode = 500;
                                    res.send();
                                    return;
                                }

                                if (results.length > 0) {
                                    var result = results[0];
                                    if(result.duration == null)
                                        result.duration =  '0:0:0';
                                    else{
                                        var t = parseInt(result.duration) % 60;
                                        result.duration = parseInt(result.duration) / 60;
                                        t = parseInt(result.duration) % 60 + ":" + t;
                                        result.duration = parseInt(result.duration) / 60;
                                        t = parseInt(result.duration) % 60 + ":" + t;
                                        result.duration = t;
                                    }
                                    details.outgoingFull = result.duration;
                                }
                                else {
                                    details.outgoingFull =  '0:0:0';
                                }
                                res.json(details);
                            });
                        });
                    });
                });
                });
            });
        connection.release();

        });


});

module.exports = router;