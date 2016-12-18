var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var index = require('./routes/index');
var api = require('./routes/api');
var mailServerImap = require('./routes/MailServerIMAP');


var notFound = require('./routes/notfound');

var port = 8080;

var app = express();


//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Multiple Static Folder
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Cookie Parser MW
app.use(cookieParser());

app.use('/', index);
app.use('/login', index);
app.use('/customer', index);
app.use('/operator/*', index);
app.use('/api', api);
app.use('/mail',mailServerImap);
app.use('/*', notFound);


app.listen(port, function(){
    console.log('Server started on port '+port);
});
