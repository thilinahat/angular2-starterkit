
var jwt = require('jsonwebtoken');
var Promise = require('promise');
var config = require('../../config');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');


class TicketDataService {



    getClientDataOfTicket(ticket) {
        return new Promise((fulfill, reject) => {
                mysqlConnectionPool.getConnection(function (err, connection) {
                const sql = 'SELECT client.client_id, company_name, swimlane_status FROM `tickets` ' +
                    'INNER JOIN	client ' +
                    'on tickets.client_id = client.client_id ' +
                    ' INNER JOIN ticketswimlane on tickets.swimlane_status_id  = ticketswimlane.swimlane_id' +
                    '               WHERE ticket_id = ' + ticket.ticketId;

                connection.query(sql,  function (err, results) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else{

                        if(results.length == 0) {reject()}

                        ticket.client = {};
                        ticket.client.id = results[0].client_id;
                        ticket.client.company_name = results[0].company_name;
                        ticket.swimlane_status = results[0].swimlane_status;

                        const mailSQL = "SELECT mail FROM `client_mail` WHERE client_id = " + ticket.client.id;

                        connection.query(mailSQL,  function (mailerr, mailResults) {
                            if(mailerr){
                                reject(err);

                            }
                            else{
                                ticket.client.mail = [];
                                for (var i = 0; i < mailResults.length; i++) {
                                    ticket.client.mail.push(mailResults[i].mail);
                                    //Do something
                                }


                                fulfill(ticket);
                            }
                        });


                    }
                });
            });

    });
    }



}

module.exports = new TicketDataService();