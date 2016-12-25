var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var webpack = require('webpack');
var webpackDevMiddleWare = require('webpack-dev-middleware');
var webpackHotMiddleWare = require('webpack-hot-middleware');
var webpackConfig = require('../webpack/webpack.dev');

var index = require('./routes/index');
var api = require('./routes/api');

// mail routes
var mailServerImap = require('./routes/MailServerIMAP');
var mailServerSMTP = require('./routes/MailServerSMTP');


var operatorAPI = require('./routes/operatorAPI');
var adminAPI = require('./routes/adminAPI');

var notFound = require('./routes/notfound');

var port = 8080;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Multiple Static Folder
//app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Cookie Parser MW
app.use(cookieParser());

var compiler = webpack(webpackConfig);

// webpack dev middleware
app.use(webpackDevMiddleWare(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

// webpack hot module reloading middleware
app.use(webpackHotMiddleWare(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.use('/', index);
app.use('/login', index);
app.use('/customer', index);
app.use('/operator/*', index);
app.use('/change/credentials', index);
app.use('/api/operator', operatorAPI); //API for operator initiated actions
app.use('/api/admin', adminAPI); //API for admin initiated actions
app.use('/api', api);
app.use('/mail',mailServerImap);
app.use('/mailsend',mailServerSMTP);
app.use('/*', notFound);


app.listen(port, function(){
    console.log('Server started on port '+port);
});
