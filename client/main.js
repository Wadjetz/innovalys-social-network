var m = require('mithril');
var Home = require('./home');
var Login = require('./login');
var Signup = require('./signup');
var CreateNews = require('./create-news');

m.route.mode = "hash";
m.route(document.body, "/", {
    "/": Home,
    "/login": Login,
    "/signup": Signup,
    "/news/create": CreateNews
});
