#!/bin/env node
// Modules
var multer  = require('multer');
var morgan = require('morgan');
var log = require('log4js').getLogger();
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressCookieParser = require('cookie-parser');
var methodOverride = require("method-override");
var config = require('./config/config');
var chat = require('./chat/chat');
var chatSession = require('./chat/chat-session');
var chatAuth = require('./chat//chat-auth');

var NewsRouter = require('./news/news-router');
var CommentsRouter = require('./comments/comments-router');
var UserRouter = require('./user/user-router');
var GroupsRouter = require('./groups/groups-router');
var GroupsMembersRouter = require('./groups/members-router');
var GroupsMessagesRouter = require('./groups/messages-router');
var GroupsFilesRouter = require('./groups/files-router');
var ChatRouter = require('./chat/chat-router');
var RoomsRouter = require('./chat/rooms-router');
var RoomsModel = require('./chat/rooms-model');


// Config
var app  = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieParser = expressCookieParser(config.COOKIE_SECRET);
var sessionStore = new session.MemoryStore();

RoomsModel.findOneByName('global_chat').then(function (room) {
  console.log(room);
}).fail(function (err) {
  if (err.error === 'Not Found') {
    RoomsModel.create({
      name: 'global_chat',
      type: 'public'
    }).then(function (insertedId) {
      console.log("RoomsModel.create global_chat ", insertedId);
    }).fail(function (err) {
      console.log("RoomsModel.create ", err);
    });
  } else {
    console.log("RoomsModel.findOneByName('global_chat')", err);
  }
});

log.setLevel('TRACE');

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
  dest: './uploads/files',
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

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use('/users', UserRouter);
app.use('/news', NewsRouter);
app.use('/comments', CommentsRouter);
app.use('/groups', GroupsRouter);
app.use('/groups/members', GroupsMembersRouter);
app.use('/groups/messages', GroupsMessagesRouter);
app.use('/groups/files', GroupsFilesRouter);
app.use('/chat', ChatRouter);
app.use('/chat/rooms', RoomsRouter)

chatSession(io, cookieParser, sessionStore);
chatAuth(io);
chat(io);

http.listen(config.PORT, function(){
  log.info('listening on ' + config.PORT);
});
