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
        admin: 'ADMIN'
    },
    email: {
        smtp_un:'dilantharakamd6@yahoo.com',
        smtp_pw: 'gts5610k',
        smtp_server: 'smtp.mail.yahoo.com',
        imap_un: 'dilantharakamd6@yahoo.com',
        imap_pw: 'gts5610k',
        imap_server: 'imap.mail.yahoo.com',
        imap_port: 993

    },
    // users will be redirected to following urls when they login based on their role
    redirectURL: {
        OPERATOR: '/operator/',
        CLIENT: '/client/',
        ADMIN: '/admin/',
        DEVELOPER: '/developer/'
    }

};