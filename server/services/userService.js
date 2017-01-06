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

    addOperatorOrDeveloperOrAdmin(user) {
        return new Promise((fulfill, reject) => {
            mysqlConnectionPool.getConnection(function (err, connection) {
                const table = user.role == 'OPERATOR' ? 'operators' : user.role == 'DEVELOPER' ? 'developers' : 'admins';
                let sql = 'INSERT INTO ' + table +
                    '  ( name, company_id)' +
                    ' VALUES (?, ?)';
                let values = [user.name, user.companyId];
                connection.query(sql, values, function (err, rows, fields) {
                    if (err)
                        reject(err);

                    const role = user.role == 'OPERATOR' ? 'operator' : 'developer';
                    user.id = rows.insertId;
                    user.username = config[role].usernamePrefix + '_' + user.id;
                    user.password = config[role].passwordPrefix + '_' + user.id;

                    sql = 'INSERT INTO users ' +
                        '(user_id, username, password, role, has_logged_in)' +
                        ' VALUES (?, ?, ?, ?, ?)';
                    values = [user.id, user.username, passwordHash.generate(user.password), user.role, false];

                    connection.query(sql, values, function (err, rows, fields) {
                        if (err) {
                            reject(err);
                        }
                        fulfill(user);
                    });
                });
            });

        });
    }

    addUser(user) {
        return new Promise((fulfill, reject) => {
            mysqlConnectionPool.getConnection(function (err, connection) {
                const sql = 'INSERT INTO users ' +
                    '(user_id, username, password, role, has_logged_in)' +
                    ' VALUES (?, ?, ?, ?, ?)';
                const values = [user.id, user.username, passwordHash.generate(user.password), user.role, false];

                connection.query(sql, values, function (err, rows, fields) {
                    if (err) {
                        reject(err);
                    }
                    fulfill(user);
                });
            });

        });
    }

    blockOperatorOrDeveloperOrAdmin(user) {
        return new Promise((fulfill, reject) => {
            mysqlConnectionPool.getConnection(function (err, connection) {
                const sql = 'UPDATE ' + user.role + ' SET blocked = true WHERE name = ?';
                const values = [user.name];

                connection.query(sql, values, function (err, results) {
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