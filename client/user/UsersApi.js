const request = require('superagent');
const baseUrl = require('../conf').baseUrl;
const utils   = require('../utils/utils');

import Qajax from 'qajax'
const BASE_URL = document.location.origin;

module.exports.getAll = function () {
  return Qajax({
    url: BASE_URL + '/users',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};

module.exports.me = function () {
  return Qajax({
    url: BASE_URL + '/users/me',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};

module.exports.roles = function () {
  return Qajax({
    url: BASE_URL + '/users/roles',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};

module.exports.create = function (user) {
  return Qajax({
    url: BASE_URL + '/users/signup',
    method: 'POST',
    data: user
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};

module.exports.login = function (user) {
  return Qajax({
    url: BASE_URL + '/users/login',
    method: 'POST',
    data: user
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};
