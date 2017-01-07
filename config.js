/**
 * Created by thilina on 12/16/16.
 */
module.exports =  {
    jwtSecret: 'CRM_UNIVERSAL',
    db:{
        host: 'localhost',
        user: 'testingUser',
        password: '1234',
        database: 'vinit_crm'
    },
    admin: {
        usernamePrefix: 'CRM_ADMIN',
        passwordPrefix: 'CRM_ADMIN'
    },
    client: {
            usernamePrefix: 'CRM_CLIENT_USERNAME',
            passwordPrefix: 'CRM_CLIENT_PASSWORD'
    },
    operator: {
        usernamePrefix: 'CRM_OPERATOR_USERNAME',
        passwordPrefix: 'CRM_OPERATOR_PASSWORD'
    },
    developer: {
        usernamePrefix: 'CRM_DEVELOPER_USERNAME',
        passwordPrefix: 'CRM_DEVELOPER_PASSWORD'
    },
    roles: {
        client: 'CLIENT',
        operator: 'OPERATOR',
        admin: 'ADMIN',
        developer: 'DEVELOPER'
    },
    // users will be redirected to following urls when they login based on their role
    redirectURL: {
        OPERATOR: '/operator/',
        CLIENT: '/client/',
        ADMIN: '/admin/',
        DEVELOPER: '/developer'
    }

};