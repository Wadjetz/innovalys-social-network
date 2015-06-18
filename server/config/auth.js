var UserModel = require('../user/user-model');

function isAuth(email, callback) {
  if (email === undefined) {
    return false;
  } else if (email === "") {
    return false;
  } else {
    return true;
  }
}

/**
Auth without user
*/
module.exports.auth = function (req, res, next) {
  if(isAuth(req.session.email)) {
    next();
  } else {
    res.sendStatus(401);
  }
};

/**
Auth with user
*/
module.exports.withUser = function (req, res, next) {
  if (isAuth(req.session.email)) {
    UserModel.findOneByEmail(req.session.email)
      .then(function (user) {
        req.$user = user;
        next();
      })
      .fail(function (err) {
        res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
};

/**
Auth with users roles
*/
module.exports.withRole = function (roles) {
  return function authorized(req, res, next) {
    if (isAuth(req.session.email)) {
      UserModel.findOneByEmail(req.session.email)
        .then(function (user) {
          var flag = roles.reduce(function (acc, i) {
            console.log(acc, i);
            if (user.role === i) {
              return true;
            } else {
              return acc;
            }
          }, false);
          if (flag === true || user.role === UserModel.roles.ADMIN) {
            req.$user = user;
            next();
          } else {
            res.sendStatus(403);
          }
        })
        .fail(function (err) {
          res.sendStatus(500).json(err);
        });
    } else {
      res.sendStatus(401);
    }
  };
};
