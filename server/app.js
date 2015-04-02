var express = require('express');
var app = express();
var auth = require('./config/auth');

require('./config/config')(app, express, auth);
require('./config/routes')(app, express, auth);
module.exports = app;
