#!/bin/env node
// Modules
var http = require('http');
var express = require('express');
var app  = express();
var port = process.env.OPENSHIFT_NODEJS_PORT || 8888;
var ip   = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./server/config/config')(app, express);

app.use(express.static(__dirname + '/public'));

require('./server/config/routes')(app, express);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

io.on('connection', function(socket){
  socket.on('global_chat', function(msg){
    io.emit('global_chat', msg);
  });
  //socket.broadcast.emit('hi');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, ip, function(){
  console.log('listening on ' + ip + ":" + port);
});
