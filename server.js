#!/bin/env node
// Modules
var http = require('http');
var app  = require('./src/app');
var port = process.env.OPENSHIFT_NODEJS_PORT || 8888;
var ip   = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

http.createServer(app).listen(port, ip);
