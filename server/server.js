#!/bin/env node
// Modules
var multer  = require('multer');
var morgan = require('morgan');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressCookieParser = require('cookie-parser');
var methodOverride = require("method-override");
var config = require('./config/config');
var chat = require('./chat/chat');

// Config
var app  = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieParser = expressCookieParser(config.COOKIE_SECRET);
var sessionStore = new session.MemoryStore();

app.use(methodOverride());
app.use(cookieParser);
app.use(session({
  store: sessionStore,
  saveUninitialized: true,
  resave: true,
  secret: config.COOKIE_SECRET,
  name: config.EXPRESS_SID_KEY
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
require('./config/routes')(app, express);
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

chat(io, cookieParser, sessionStore);

http.listen(config.PORT, function(){
  console.log('listening on ' + config.PORT);
});
