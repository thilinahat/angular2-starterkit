var jwt = require('jsonwebtoken');
var Promise = require('promise');
var config = require('../../config');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var request = require('request');



class MailService {



/*
    const mail = {
        sending_to: to,
        title: mail_title,
        body: mail_body
    };
*/
    sendMail(mail) {
        return new Promise((fulfill, reject) => {
            request({  // mailing
                method: 'POST',
                url: "http://localhost:8080/mailsend",
                body: mail,
                json: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }, (error, profiles, body) => {
            if (error){
                console.log(error);
                reject(error);
            }
            fulfill();
        });

    });
    }

    getMailTemplateForStatus(status) {
        return new Promise((fulfill, reject) => {
                mysqlConnectionPool.getConnection(function (err, connection) {
                const sql = 'SELECT * FROM `swimlane_change_mail` ' +
                    '               WHERE swimlane_status_id  = ' + status;

                connection.query(sql, function (err, results) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if(results.length > 0)         fulfill(results[0]);
                        else{ fulfill(
                            config.defaultMails.status_change
                        )}

                    }
                });
            })

    })
    }


    replaceWithTicketParams(template, ticket){

                if(ticket.ticketId)  template = template.replace("$TICKET_ID", ticket.ticketId);
                if(ticket.client.company_name)  template = template.replace("$COMPANY_NAME", ticket.client.company_name);
                if(ticket.swimlane_status)  template = template.replace("$TICKET_STATUS", ticket.swimlane_status);

        return template;
    }
 }

module.exports = new MailService();