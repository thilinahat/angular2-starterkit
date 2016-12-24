# CRM_Universal

## Build on Dev Mode

```node
npm build-dev
```

## Running on Dev Mode

```node
npm start
```

## Build on Prod Mode

```node
npm build-prod
```


##Angular Routing Access Control

* Add "AuthGuard" to canActivate property of each protected routes

* Add the correct role mapping to auth.guard.ts file

## Imported modules

### Email realted
#### IMAP
https://github.com/mscdex/node-imap

## MySQL Connection Handling

* configure the mysql connection pool as required (mysqlConnectionPool.js)

* use the connection as below
 ``` node
 var mysqlConnectionPool = require('./mysqlConnectionPool.js');
```
``` node
 mysqlConnectionPool.getConnection(function(err, connection) {
       // Use the connection
       connection.query( 'SELECT something FROM sometable', function(err, rows) {
             // And done with the connection.
             connection.release();
        
             // Don't use the connection here, it has been returned to the pool.
       });
 });
 ```