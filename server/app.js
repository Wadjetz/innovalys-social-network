var express = require('express');
var app = express();
var passport = require('./config/auth');

require('./config/config')(app, express, passport);
require('./config/routes')(app, express, passport);
module.exports = app;