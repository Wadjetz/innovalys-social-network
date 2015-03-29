#!/bin/env node
// Modules
var http = require('http');
var express = require('express');
var app  = require('./server/app');
var port = process.env.OPENSHIFT_NODEJS_PORT || 8888;
var ip   = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

http.createServer(app).listen(port, ip);
