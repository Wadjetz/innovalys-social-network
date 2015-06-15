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

/**
Auth without user
*/
module.exports.auth = function (req, res, next) {
  isAuth(req.session.email, function (isAuth) {
    if(isAuth) {
      next();
    } else {
      res.sendStatus(401);
    }
  });
};

/**
Auth with user
*/
module.exports.withUser = function (req, res, next) {
  isAuth(req.session.email, function (isAuth) {
    if(isAuth) {
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
  });
};

module.exports.withRole = function (roles) {
  return function authorized(req, res, next) {
    isAuth(req.session.email, function (isAuth) {
      if(isAuth) {
        UserModel.findOneByEmail(req.session.email)
          .then(function (user) {
            var flag = false;
            for (var i = roles.length - 1; i >= 0; i--) {
              if (roles[i] === user.role) {
                  flag = true;
              }
            }
            if (flag === true || user.role === UserModel.roles.ADMIN) {
              req.$user = user;
              next();
            } else {
              res.sendStatus(403);
            }
          })
          .fail(function (err) {
            res.sendStatus(500);
          });
      } else {
        res.sendStatus(401);
      }
    });
  };
};
