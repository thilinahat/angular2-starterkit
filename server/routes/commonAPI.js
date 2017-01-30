/**
 * Created by thilina on 1/10/17.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var moment = require('moment');
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
router.get('/products',  function (req, res) {

    mysqlConnectionPool.getConnection(function (err, connection) {
        let sql = 'SELECT * FROM products';
        connection.query(sql, function (err, results) {
            if (err) {
                return res.sendStatus(400);
            } else {
                res.json(results);
            }
        });
    });
});

//get ticket priorities
router.get('/priorities', function (req, res, next) {

    const SQL = "select * from priorities" ;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db view");
                return;
            }

            if (results.length > 0) {

                res.json(results);

            }
            else {

                res.statusCode = 200; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });
});

//get ticket ticket swim lane status typs
router.get('/status-types', function (req, res, next) {

    const SQL = "select * from ticketswimlane" ;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db view");
                return;
            }

            if (results.length > 0) {

                res.json(results);

            }
            else {

                res.statusCode = 200; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });
});


//get ticket problem types
router.get('/problem-types', function (req, res, next) {

    const SQL = "select * from problem_types" ;


    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log("error while retrieving from to db view");
                return;
            }

            if (results.length > 0) {

                res.json(results);

            }
            else {

                res.statusCode = 200; //if results are not found for this
                res.send();
            }

        });

        connection.release();
    });
});

function getTillData(results, connection, res){

    if(results[0].till_id){
        var tillSQL = " select `till`.`till_name`  from till" +
            " where  `till`.`till_id` = "  + results[0].till_id ;
        connection.query(tillSQL, function (error, till_results) {

            if (error) {
                console.log(error);
                res.status(406).json({
                    success: false,
                    message: error
                });
            }
            else{
//                            console.log(developre_results[0]);
                results[0].till_name = till_results[0].till_name;
                res.json(results[0]);
            }
        });
    }
    else{
        res.json(results[0]);
    }

}

function getAssignee(results, connection, res, callback){

    if(results[0].assignee_id){
        var assigneeSQL = " select `developers`.`name` AS `developer_name` from `developers` " +
            " where  `developers`.`id` = "  + results[0].assignee_id ;
        connection.query(assigneeSQL, function (error, developre_results) {

            if (error) {
                console.log(error);
                res.status(406).json({
                    success: false,
                    message: error
                });
            }
            else{
//                            console.log(developre_results[0]);
                results[0].developer_name = developre_results[0].developer_name;
                callback(results, connection, res)

            }
        });
    }
    else{
        callback(results, connection, res)
    }
}

// get all ticket data
router.get('/ticket/data/:ticketId', function (req, res, next) {

    //TODO: reduce this joins by calling seperately for swimlane, priorities, problem types
  /*  const SQL = "SELECT * FROM single_ticket_data_view "
        + " WHERE ticket_id = " + req.params.ticketId;
*/

  const SQL = "SELECT      " +
      "`tickets`.`client_id` AS `client_id`,        " +
      "`tickets`.`problem_type_id` AS `problem_type_id`,        " +
      "`problem_types`.`problem_type_color`AS `problem_type_color`,  " +
      "`tickets`.`priority_id` AS `priority_id`,        " +
      "`tickets`.`swimlane_status_id` AS `swimlane_status_id`,        " +
      "`ticketswimlane`.`swimlane_color`AS `swimlane_color`,        " +
      "`tickets`.`ticket_id` AS `ticket_id`,        " +
      "`tickets`.`due_date` AS `due_date`,        " +
      "`tickets`.`summary` AS `summary`,        " +
      "`tickets`.`sceenshot_name` AS `sceenshot_name`,        " +
      "`tickets`.`description` AS `description`,        " +
      "`problem_types`.`problem_type_name` AS `problem_type_name`,        " +
      "`priorities`.`priority_name` AS `priority_name`,        " +
      "`priorities`.`color` AS priority_color,        " +
      "`ticketswimlane`.`swimlane_status` AS `swimlane_status`,        " +
      "`tickets`.`till_id` AS `till_id`,        " +
      "`products`.`name` AS `product_name`,        `products`.`product_Id` AS `product_Id`,        " +
      "`branch`.`branch_id` AS `branch_id` ,        " +
      "`branch`.`location` AS `location`,        " +
      // " `developers`.`name` AS `developer_name`,        " +
      "`tickets`.`assignee_id`AS `assignee_id`,        `client`.`company_name` AS `company_name`,        " +
      "`tickets`.`user_id` AS `user_id` ,        concat(date(`tickets`.`added_date_time`),'') AS `added_date_time`" +
      "    FROM        " +
      "`tickets` join `ticketswimlane`    " +
      "on        `tickets`.`swimlane_status_id` = `ticketswimlane`.`swimlane_id`   " +
      "join `priorities`    on `tickets`.`priority_id` = `priorities`.`priority_id`   " +
      " join `problem_types`    on `tickets`.`problem_type_id` = `problem_types`.`problem_type_id`   " +
      //" join `developers`    on `tickets`.`assignee_id` = `developers`.`id`   " +
      // " join `till`    on `tickets`.`till_id` = `till`.`till_id`   " +
       " join `branch`    on `tickets`.`branch_id` = `branch`.`branch_id`   " +
       " join `products`    on `tickets`.`product_id` = `products`.`product_Id`   " +
      " join `client`    on `tickets`.`client_id` = `client`.`client_id`    "
      + " WHERE ticket_id = " + req.params.ticketId;


    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {
                console.log(error);
                res.status(406).json({
                    success: false,
                    message: error
                });
            } else if((req.decoded.role == 'OPERATOR' || req.decoded.role == 'ADMIN' )|| (results[0] && results[0].assignee_id == req.decoded.uid)){

                getAssignee(results, connection, res, getTillData)


            } else{
                res.status(406).json({
                    success: false,
                    message: 'not auhtorized'
                });
            }


        });

        connection.release();
    });
});

//need improvements
function getEmailsAddreses(client_id){

    const SQL = "SELECT DISTINCT mail as email FROM `client_mail` where client_id = " + client_id;
    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {
                console.log(error);
                connection.release();
                return null;
            } else{
                connection.release();
                console.log("in get Email" )
                return results;
            }
        });


    });

}

function sendEmail(to, mail_title, mail_body){
    const mail = {
        sending_to: to,
        title: mail_title,
        body: mail_body
    };
    request({  // mailing
        method: 'POST',
        url: "http://localhost:8080/mailsend",
        body: mail,
        json: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }, (error, profiles, body) => {
        if (error)
        console.log(error);
});

}
// get all email address of customers
router.get('/customer/all/emails',function (req,res,next) {
    const SQL = "SELECT DISTINCT mail as email FROM `client_mail` ";
    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {
                console.log(error);
                res.status(406).json({
                    success: false,
                    message: error
                });
            } else if(req.decoded.role == 'OPERATOR' || req.decoded.role == 'ADMIN'){
                res.json(results);
            } else{
                res.status(406).json({
                    success: false,
                    message: 'not auhtorized'
                });
            }


        });

        connection.release();
    });
});

/*
* ***********************************************************************************************************
*                                                                                                           *
*                                                                                                           *
*  FOLLOWING ROUTES ARE ACCESSIBLE BY ALL OPERATORS, ADMINS AND ONLY THE DEVELOPER ASSIGNED TO THAT TICKET  *
*                                                                                                           *
*                                                                                                           *
* ***********************************************************************************************************/


// middleware protect ticket data related routes
router.use(function (req, res, next) {

    if( req.decoded.role == 'OPERATOR' || req.decoded.role == 'ADMIN')
        next();
    else{

        const ticketID = req.body.ticketID;
        const SQL = "SELECT assignee_id FROM tickets WHERE ticket_id=" + ticketID;

        mysqlConnectionPool.getConnection(function(err, connection) {

            connection.query(SQL, function (error, results) {
                if (error) {
                    console.log(error);
                    res.status(403).send({
                        success: false,
                        message: 'not authorized'
                    });
                } else if(results[0] && results[0].assignee_id == req.decoded.uid) {
                    next()
                } else {
                    res.status(403).send({
                        success: false,
                        message: 'not authorized'
                    });
                }
            });
            connection.release();
        });
    }
});

// route to update ticket swimlane status
router.post('/ticket/change-status', function (req, res) {

    const ticket = req.body.ticket;

    var SQL = "UPDATE `vinit_crm`.`tickets` SET `swimlane_status_id` = '" + ticket.selectedSwimlaneStatusId + "'"
        + " WHERE `tickets`.`ticket_id` = '" + ticket.ticketId + "';";

    mysqlConnectionPool.getConnection(function(err, connection) {
        //console.log(SQL);
        connection.query( SQL,  function(err,rows, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting ticket',
                    message: err
                });
            }


            var LogSQL = "INSERT INTO `vinit_crm`.`ticket_swimlane_log` (`ticket_id`, `swimlane_status_id`, `loggedTime`, `user_id` ) "
                + "VALUES (?, ?, ?, '?');";

            var LogValues = [ticket.ticketId, ticket.selectedSwimlaneStatusId, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), req.decoded.uid];

            LogSQL = mysql.format(LogSQL, LogValues);

            //console.log(LogSQL);
            connection.query( LogSQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting to swimlane ticket log',
                        message: err
                    });
                }

              //  var mails = getEmailsAddreses(15);
                console.log(mails);

                connection.release();
                res.sendStatus(200);

            });
        });
    });
});

// route to update ticket priority
router.post('/ticket/change-priority', function (req, res) {

    const ticket = req.body.ticket;

    var SQL = "UPDATE `vinit_crm`.`tickets` SET `priority_id` = '" + ticket.selectedPriorityId + "'"
        + " WHERE `tickets`.`ticket_id` = '" + ticket.ticketId + "';";

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query( SQL,  function(err,rows, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting ticket',
                    message: err
                });
            }

            connection.release();
            res.sendStatus(200);

        });
    });
});

// route to update ticket problem-type
router.post('/ticket/change-problem-type', function (req, res) {

    const ticket = req.body.ticket;

    var SQL = "UPDATE `vinit_crm`.`tickets` SET `problem_type_id` = '" + ticket.selectedProblemTypeId + "'"
        + " WHERE `tickets`.`ticket_id` = '" + ticket.ticketId + "';";

    mysqlConnectionPool.getConnection(function(err, connection) {
        //console.log(SQL);
        connection.query( SQL,  function(err,rows, result) {
            if (err) {
                return res.status(406).json({
                    success: false,
                    status: 'Failed while inserting ticket',
                    message: err
                });
            }


            var LogSQL = "INSERT INTO `vinit_crm`.`ticket_swimlane_log` (`ticket_id`, `swimlane_status_id`, `loggedTime`, `user_id` ) "
                + "VALUES (?, ?, ?, '?');";

            var LogValues = [ticket.ticketId, ticket.selectedSwimlaneStatusId, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), req.decoded.uid];

            LogSQL = mysql.format(LogSQL, LogValues);

            //console.log(LogSQL);
            connection.query( LogSQL,  function(err, result) {
                if (err) {
                    return res.status(406).json({
                        success: false,
                        status: 'Failed while inserting to swimlane ticket log',
                        message: err
                    });
                }
                connection.release();
                res.sendStatus(200);

            });
        });
    });
});

// route to insert comments
router.post('/comment/add',  function (req, res) {

    const comment = req.body.comment;
    const time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    mysqlConnectionPool.getConnection(function (err, connection) {
        let sql = 'INSERT INTO comments' +
            '  ( ticket_id, sender_name, sender_role, message, timestamp )' +
            ' VALUES (?, ?, ?, ?, ?)';
        let values = [comment.ticketID, req.decoded.name, req.decoded.role, comment.comment, time];
        connection.query(sql, values, function (err, rows, fields) {
            if (err) {
                console.log(err);
                return res.status(406).json({
                    status: 'Failed to set comment',
                    message: err
                });
            } else {
                res.status(200).json({
                    sender_name: req.decoded.name,
                    sender_role: req.decoded.role,
                    message: comment.comment,
                    timestamp: time
                });
            }
        });
    });
});

//get comments of a ticket
router.post('/comments', function (req, res, next) {

    const SQL = "select * from comments WHERE ticket_id=" + req.body.ticketID ;

    mysqlConnectionPool.getConnection(function(err, connection) {

        connection.query(SQL, function (error, results) {

            if (error) {

                console.log(error);
                res.json({
                    message: 'Error While retrieving comments',
                    error: error
                });
            } else {
                res.json(results);
            }

        });

        connection.release();
    });
});


module.exports = router;