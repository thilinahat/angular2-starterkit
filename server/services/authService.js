/**
 * Created by thilina on 12/16/16.
 */

var jwt = require('jsonwebtoken');
var Promise = require('promise');
var config = require('../../config');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var passwordHash = require('password-hash');

class AuthService {

    verifyUser(user){
        return new Promise((fulfill, reject) => {
            var redirectURL = '/change/credentials';

            mysqlConnectionPool.getConnection(function (err, connection) {
                let sql = 'SELECT user_id,password,role,has_logged_in FROM users  WHERE username = ' + connection.escape(user.username);
                connection.query(sql, function (err, results) {
                    if (err || results.length == 0)
                        reject();
                    else if (passwordHash.verify(user.password, results[0].password)){  // verify the password
                        const table = results[0].role == 'OPERATOR' ? 'operators' : results[0].role == 'DEVELOPER' ? 'developers' : 'admins';
                        sql = 'SELECT blocked FROM ' + table + ' WHERE  id = '+ connection.escape(results[0].user_id);
                        connection.query(sql, function(err, blockedResult){
                            if (err || blockedResult.length == 0) {
                                console.log(err)
                                reject();
                            }
                            else if(!blockedResult[0].blocked){ // user is not blocked
                                const token = jwt.sign({role: results[0].role, uid: results[0].user_id}, config.jwtSecret, {expiresIn: 3600 * 24});

                                if (results[0].has_logged_in)
                                    redirectURL = config.redirectURL[results[0].role];

                                const response = {
                                    token: token,
                                    redirectURL: redirectURL
                                };
                                fulfill(response);
                            }
                        });

                    } else reject()

                });
            });
        });
    }

    verifyToken(token){
        return new Promise((fulfill, reject)=> {
                var role;
        switch (user.username){
            case 'operator':
                role = 'OPERATOR';
                break;
            case 'client':
                role = 'CLIENT';
                break;
            default:
                role = 'INVALID';
                break;
        }

        if(role == 'INVALID')
            reject('Unauthorized User');
        else{
            const token = jwt.sign({role: role}, config.jwtSecret, {expiresIn: 3600 * 24});
            fulfill(token);
        }

    });
    }

    changeCredentials(credentials, userID, userRole){
        return new Promise((fulfill, reject) => {
            mysqlConnectionPool.getConnection(function (err, connection) {
                let sql = 'SELECT username,password,has_logged_in FROM users  WHERE user_id = ' + connection.escape(userID) + ' AND  role = ' + connection.escape(userRole) + ' AND username = ' + connection.escape(credentials.oldUsername);
                connection.query(sql, function (err, results) {
                    if (err || results.length == 0)
                        reject();
                    else if (credentials.oldUsername == results[0].username && passwordHash.verify(credentials.oldPassword, results[0].password)){
                        let sql = 'UPDATE users SET username = ?, password = ? , has_logged_in = ? WHERE user_id = ' + connection.escape(userID) + ' AND  role = ' + connection.escape(userRole);
                        let values = [credentials.newUsername, passwordHash.generate(credentials.newPassword), true];
                        connection.query(sql, values, function (err, results) {
                            if (err) {
                                reject(err);
                            }
                            fulfill(config.redirectURL[userRole]);
                        });
                    } else reject()

                });
            });
        });
    }

}

module.exports = new AuthService();