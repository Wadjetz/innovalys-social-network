var UserModel = require('../user/user-model');
var _ = require('lodash');

function isAuth(username, callback) {
    if (username === undefined) {
        callback(false);
    } else if (username === "") {
        callback(false);
    } else {
        callback(true);
    }
}

module.exports.auth = function (req, res, next) {
    isAuth(req.session.username, function (isAuth) {
        if(isAuth) {
            next();
        } else {
            res.sendStatus(401);
        }
    });
};

module.exports.withUser = function (req, res, next) {
    isAuth(req.session.username, function (isAuth) {
        if(isAuth) {
            UserModel.findOneByUserName(req.session.username, function (error, user) {
                req.$user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    });
};

module.exports.withRole = function (roles) {
    return function authorized(req, res, next) {
        isAuth(req.session.username, function (isAuth) {
            if(isAuth) {
                UserModel.findOneByUserName(req.session.username, function (error, user) {
                    var flag = false;
                    for (var i = roles.length - 1; i >= 0; i--) {
                        if (roles[i] === user[0].role) {
                            flag = true;
                        }
                    };
                    if (flag === true) {
                        req.$user = user[0];
                        next();
                    } else {
                        res.sendStatus(403);
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    }
};
