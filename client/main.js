var m = require('mithril');
var Home = require('./home');
var Login = require('./login');
var Signup = require('./signup');
var News = require('./news/news');
var CreateNews = require('./news/news-form');

m.route.mode = "hash";
m.route(document.body, "/", {
    "/": Home,
    "/login": Login,
    "/signup": Signup,
    "/news/create": CreateNews,
    "/news/:slug": News
});
