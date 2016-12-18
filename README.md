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


## Webpack-Dev-Server Proxy Settings

* Webpack-dev-server is running on http://localhost:4444

* Express server is running on http://localhost:8080

* Apply express server proxy settings to webpack.dev.js file
