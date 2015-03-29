var m = require('mithril');
var home = require('./home');
var login = require('./login');

m.route.mode = "hash";
m.route(document.body, "/", {
    "/": home,
    "/login": login
});
