var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require("method-override");
var morgan = require('morgan');

module.exports = function (app, express) {
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({ secret: '6rHUy(*))72zer-,gRZefdd()', saveUninitialized: true, resave: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });

    app.use(morgan('dev'));
};
