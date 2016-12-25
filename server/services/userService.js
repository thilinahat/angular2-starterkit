/**
 * Created by thilina on 12/25/16.
 */
var jwt = require('jsonwebtoken');
var Promise = require('promise');
var config = require('../../config');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var passwordHash = require('password-hash');


class UserService {

    addUser(user) {
        return new Promise((fulfill, reject) => {
            mysqlConnectionPool.getConnection(function (err, connection) {
                let sql = 'INSERT INTO users ' +
                    '(user_id, username, password, role, has_logged_in)' +
                    ' VALUES (?, ?, ?, ?, ?)';
                let values = [user.id, user.username, passwordHash.generate(user.password), user.role, false];

                connection.query(sql, values, function (err, rows, fields) {
                    if (err) {
                        reject(err);
                    }
                    fulfill();
                });
            });

        });

    }

}

module.exports = new UserService();