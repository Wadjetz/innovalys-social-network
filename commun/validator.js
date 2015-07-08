var validate = require("validate.js");
var moment = require('moment');
validate.moment = moment;
var Q = require('q');

module.exports = function (user, constraints) {
  var deferred = Q.defer();
  var validatorRes = validate(user, constraints);
  if (validatorRes === undefined) {
    deferred.resolve(user);
  } else {
    deferred.reject(validatorRes);
  }
  return deferred.promise;
};
