#!/bin/env node
// Modules
var http = require('http');
var express = require('express');
var app  = express();
var port = process.env.OPENSHIFT_NODEJS_PORT || 8888;
var ip   = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

require('./server/config/config')(app, express);

app.use(express.static(__dirname + '/public'));

require('./server/config/routes')(app, express);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

http.createServer(app).listen(port, ip);
