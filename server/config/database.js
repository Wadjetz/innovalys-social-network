var Q = require('q');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'innovalys',
    password : ''
});

module.exports = connection;

module.exports.insert = function (sql, params) {
  var deferred = Q.defer();
  connection.query(sql, params, function (err, res) {
    if (err) {
      deferred.reject(err);
    } else if (res.affectedRows > 0) {
      deferred.resolve(res.insertId);
    } else {
      deferred.reject({"error": "Not Inserted"});
    }
  });
  return deferred.promise;
};

module.exports.findAll = function (sql, params) {
  var deferred = Q.defer();
  connection.query(sql, params, function (err, res) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(res);
    }
  });
  return deferred.promise;
};

module.exports.findOne = function (sql, params) {
  var deferred = Q.defer();
  connection.query(sql, params, function (err, res) {
    if (err) {
      deferred.reject(err);
    } else if (res && res.length > 0) {
      deferred.resolve(res[0]);
    } else {
      deferred.reject({"error": "Not Found"});
    }
  });
  return deferred.promise;
};

module.exports.delete = function (sql, params) {
  var deferred = Q.defer();
  connection.query(sql, params, function (err, res) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(res);
    }
  });
  return deferred.promise;
};

module.exports.update = function (sql, params) {
  var deferred = Q.defer();
  connection.query(sql, params, function (err, res) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(res);
    }
  });
  return deferred.promise;
};
