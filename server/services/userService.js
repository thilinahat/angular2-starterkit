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
                const role = user.role == 'OPERATOR' ? 'operator' : 'developer';
                let sql = 'INSERT INTO ' + role + 's' +
                    '  (' + role+ '_name, '+ role + '_company_id)' +
                    ' VALUES (?, ?)';
                let values = [user.name, user.companyId];
                connection.query(sql, values, function (err, rows, fields) {
                    if (err)
                        reject(err);

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

}

module.exports = new UserService();