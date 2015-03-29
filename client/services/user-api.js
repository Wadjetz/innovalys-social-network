var m = require('mithril');
var Config = require('./config');


module.exports.roles = {
    ADMIN: "admin",
    RH: "rh",
    CHEF: "chef",
    USER: "user"
};

module.exports.status_connection = {
    OFFLINE: "offline",
    ONLINE: "online",
    BUSY: "busy",
    ABSENT: "absent"
};

module.exports.signup = function (newUser) {
    var config = Config.prepareRequest("POST", "/signup");
    config.data = newUser;
    return m.request(config);
}
