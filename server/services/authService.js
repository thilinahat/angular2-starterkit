/**
 * Created by thilina on 12/16/16.
 */

var jwt = require('jsonwebtoken');
var Promise = require('promise');
var config = require('../../config');

class AuthService {

    verifyUser(user){
        return new Promise((fulfill, reject) => {
            // do the db query here once the db is setup
            var role;
            var redirectURL;

            switch (user.username){
                case 'operator':
                    role = 'OPERATOR';
                    redirectURL = '/operator/dashboard';
                    break;
                case 'client':
                    role = 'CLIENT';
                    redirectURL = '/customer';
                    break;
                default:
                    role = 'INVALID';
                    break;
            }

            if(role == 'INVALID')
                reject('Unauthorized User');
            else{
                const token = jwt.sign({role: role}, config.jwtSecret, {expiresIn: 3600 * 24});
                const response = {
                    token: token,
                    redirectURL: redirectURL
                };
                fulfill(response);
            }

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
}

module.exports = new AuthService();