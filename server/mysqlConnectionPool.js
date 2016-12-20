/**
 * Created by thilina on 12/20/16.
 */
var mysql = require('mysql');
var config = require('../config');

module.exports = mysql.createPool({
            connectionLimit: 10, // configure this as per the requirement of application
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database
        });
