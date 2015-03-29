var m = require('mithril');
var Home = require('./home');
var Login = require('./login');
var Signup = require('./signup');

m.route.mode = "hash";
m.route(document.body, "/", {
    "/": Home,
    "/login": Login,
    "/signup": Signup
});
