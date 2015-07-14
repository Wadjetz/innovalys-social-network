/** Auth middlewares
 * @module server/config/auth
 */
var Q = require('q');
var UserModel = require('../user/user-model');
var GroupsModel = require('../groups/groups-model');
var CommentsModel = require('../comments/comments-model');

/**
 * Check if session variable email exist
 * @param  {string}  email Email
 * @return {Boolean}       If email session variable exist
 */
function isAuth(email) {
  if (email === undefined) {
    return false;
  } else if (email === "") {
    return false;
  } else {
    return true;
  }
}

/**
 * Check user's roles
 * @param  {Array} roles List of user's roles
 * @param  {User} user  User object
 * @return {promise}       result of checking user's roles
 */
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
 * Simple auth without user
 * @param  {request} req request
 * @param  {result} res result
 * @param  {Function} next Next middleware
 * @return {void}
 */
module.exports.auth = function (req, res, next) {
  if(isAuth(req.session.email)) {
    next();
  } else {
    res.sendStatus(401);
  }
};

/**
 * Auth with user
 * @param  {request} req request
 * @param  {result} res result
 * @param  {Function} next Next middleware
 * @return {void}
 */
module.exports.withUser = function (req, res, next) {
  if (isAuth(req.session.email)) {
    UserModel.findOneByEmail(req.session.email).then(function (user) {
      req.$user = user;
      next();
    }).fail(function (err) {
      console.log(err);
      res.sendStatus(401);
    });
  } else {
    res.sendStatus(401);
  }
};

/**
 * Auth with users roles closure
 * @param  {Array} roles List of user's roles
 * @return {Function}       Middleware with roles closure
 */
module.exports.withRole = function (roles) {
  return function authorized(req, res, next) {
    if (isAuth(req.session.email)) {
      UserModel.findOneByEmail(req.session.email).then(function (user) {
        checkRoles(roles, user).then(function () {
          req.$user = user;
          next();
        }).fail(function (err) {
          console.log(err);
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
 * @param  {Array} roles List of user's roles
 * @return {Function}       Middleware with roles closure
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
              console.log(err);
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
 * @param  {Array} roles List of user's roles
 * @return {Function}       Middleware with roles closure
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
              console.log(err);
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
 * Check if user in groups
 * @param  {request} req request
 * @param  {result} res result
 * @param  {Function} next Next middleware
 * @return {void}
 */
module.exports.inGroups = function (req, res, next) {
  if (isAuth(req.session.email)) {
    console.log("inGroups", req.params.slug);
    UserModel.findOneByEmail(req.session.email).then(function (user) {
      GroupsModel.inGroup(req.params.slug, user).then(function (result) {
        console.log("inGroup result", result);
        req.$user = user;
        next();
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
