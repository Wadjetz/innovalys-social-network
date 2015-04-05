var UserModel = require('../user/user-model');

function isAuth(email, callback) {
    if (email === undefined) {
        callback(false);
    } else if (email === "") {
        callback(false);
    } else {
        callback(true);
    }
}

module.exports.auth = function (req, res, next) {
    isAuth(req.session.email, function (isAuth) {
        if(isAuth) {
            next();
        } else {
            res.sendStatus(401);
        }
    });
};

module.exports.withUser = function (req, res, next) {
    isAuth(req.session.email, function (isAuth) {
        if(isAuth) {
            UserModel.findOneByEmail(req.session.email, function (error, user) {
                if (error) {
                    res.sendStatus(500);
                }
                if (user) {
                    req.$user = user;
                    next();
                }
            });
        } else {
            res.sendStatus(401);
        }
    });
};

module.exports.withRole = function (roles) {
    return function authorized(req, res, next) {
        isAuth(req.session.email, function (isAuth) {
            if(isAuth) {
                UserModel.findOneByEmail(req.session.email, function (error, user) {
                    if (error) {
                        res.sendStatus(500);
                    }
                    if (user) {
                        var flag = false;
                        for (var i = roles.length - 1; i >= 0; i--) {
                            if (roles[i] === user.role) {
                                flag = true;
                            }
                        }
                        if (flag === true || user.role === UserModel.roles.ADMIN) {
                            req.$user = user[0];
                            next();
                        } else {
                            res.sendStatus(403);
                        }
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    };
};
