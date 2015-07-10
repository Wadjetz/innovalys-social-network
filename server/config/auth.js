var Q = require('q');
var UserModel = require('../user/user-model');
var GroupsModel = require('../groups/groups-model');
var CommentsModel = require('../comments/comments-model');

function isAuth(email, callback) {
  if (email === undefined) {
    return false;
  } else if (email === "") {
    return false;
  } else {
    return true;
  }
}

function checkRoles(roles, user) {
  var deferred = Q.defer();
  var flag = roles.reduce(function (acc, i) {
    if (user.role === i) {
      return true;
    } else {
      return acc;
    }
  }, false);
  if (flag === true || user.role === UserModel.roles.ADMIN) {
    deferred.resolve();
  } else {
    deferred.reject(403);
  }
  return deferred.promise;
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
    UserModel.findOneByEmail(req.session.email).then(function (user) {
      req.$user = user;
      next();
    }).fail(function (err) {
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
      UserModel.findOneByEmail(req.session.email).then(function (user) {
        checkRoles(roles, user).then(function () {
          req.$user = user;
          next();
        }).fail(function (err) {
          res.sendStatus(403);
        });
      }).fail(function (err) {
        res.status(500).json(err);
      });
    } else {
      res.sendStatus(401);
    }
  };
};

/**
 * Auth comment with role or owner
 */
module.exports.commentWithRoleOrOwner = function (roles) {
  return function authorized(req, res, next) {
    if (isAuth(req.session.email)) {
      UserModel.findOneByEmail(req.session.email).then(function (user) {
        CommentsModel.findOneById(req.params.id).then(function (comment) {
          req.$user = user;
          req.$comment = comment;
          if (user.id === comment.users_id) {
            next();
          } else {
            checkRoles(roles, user).then(function () {
              next();
            }).fail(function (err) {
              res.sendStatus(403);
            });
          }
        }).fail(function (err) {
          res.status(404).json(err);
        });
      }).fail(function (err) {
        res.status(500).json(err);
      });
    } else {
      res.sendStatus(401);
    }
  };
};


/**
 * Auth groups with roles or owner
 */
module.exports.groupsWithRoleOrOwner = function (roles) {
  return function authorized(req, res, next) {
    if (isAuth(req.session.email)) {
      UserModel.findOneByEmail(req.session.email).then(function (user) {
        GroupsModel.findOneBySlug(req.params.slug).then(function (group) {
          req.$user = user;
          req.$group = group;
          if (user.id === group.users_id) {
            next();
          } else {
            checkRoles(roles, user).then(function () {
              next();
            }).fail(function (err) {
              res.sendStatus(403);
            });
          }
        }).fail(function (err) {
          res.status(404).json(err);
        });
      }).fail(function (err) {
        res.status(500).json(err);
      });
    } else {
      res.sendStatus(401);
    }
  };
};
