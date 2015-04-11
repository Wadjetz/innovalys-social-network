#!/bin/env node
// Modules
var express = require('express');
var app  = express();
var port = process.env.NODEJS_PORT || 8888;
var ip   = process.env.NODEJS_IP || "127.0.0.1";

var http = require('http').Server(app);
var io = require('socket.io')(http);
var chat = require('./server/chat/chat');

require('./server/config/config')(app, express);

app.use(express.static(__dirname + '/public'));

require('./server/config/routes')(app, express);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

chat(io);

http.listen(port, function(){
  console.log('listening on ' + port);
});
