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
        usernamePrefix: 'C_AD_U',
        passwordPrefix: 'C_AD_P'
    },
    client: {
            usernamePrefix: 'CRM_CLIENT_USERNAME',
            passwordPrefix: 'CRM_CLIENT_PASSWORD'
    },
    operator: {
        usernamePrefix: 'C_OP_U',
        passwordPrefix: 'C_OP_P'
    },
    developer: {
        usernamePrefix: 'C_D_U',
        passwordPrefix: 'C_D_P'
    },
    roles: {
        client: 'CLIENT',
        operator: 'OPERATOR',
        admin: 'ADMIN',
        developer: 'DEVELOPER'
    },
    email: {//change setting allow non secure apps in yahoo mail

        // cvinit484@yahoo.com
        // 1234@admin
        smtp_un:'cvinit484@yahoo.com',
        smtp_pw: '1234@admin',
        smtp_server: 'smtp.mail.yahoo.com',
        imap_un: 'cvinit484@yahoo.com',
        imap_pw: '1234@admin',
        imap_server: 'imap.mail.yahoo.com',
        imap_port: 993

    },
    // users will be redirected to following urls when they login based on their role
    redirectURL: {
        OPERATOR: '/operator/',
        CLIENT: '/client/',
        ADMIN: '/admin/',
        DEVELOPER: '/developer'
    },
    defaultMails:{
        status_change: {
            mail_subject: "status change in $TICKET_ID",
            mail_template: "hi $COMPANY_NAME, \n your ticket $TICKET_ID status changed to $TICKET_STATUS. thanks. vinit team"
        }
    }

};