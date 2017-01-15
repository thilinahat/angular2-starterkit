/**
 * Created by thilina on 12/20/16.
 */
var mysql = require('mysql');
var config = require('../config');

module.exports = mysql.createPool({
            connectionLimit: 2500, // configure this as per the requirement of application
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database
        });

/*

var connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});*/
