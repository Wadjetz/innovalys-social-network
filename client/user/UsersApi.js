import Qajax from 'qajax';
import utils from '../utils/utils';
const baseUrl = require('../conf').baseUrl;

const BASE_URL = document.location.origin;

module.exports.getAll = function () {
  return Qajax({
    url: BASE_URL + '/users',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

module.exports.me = function () {
  return Qajax({
    url: BASE_URL + '/users/me',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

module.exports.getProfil = function (id) {
  return Qajax({
    url: BASE_URL + '/users/profil/' + id,
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
}

module.exports.roles = function () {
  return Qajax({
    url: BASE_URL + '/users/roles',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

module.exports.create = function (user) {
  return Qajax({
    url: BASE_URL + '/users/signup',
    method: 'POST',
    data: user
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

module.exports.login = function (user) {
  return Qajax({
    url: BASE_URL + '/users/login',
    method: 'POST',
    data: user
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

module.exports.getAllUsers = function () {
  return Qajax({
    url: BASE_URL + '/users',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

module.exports.changePassword = function (currentPassword, newPassword) {
  return Qajax({
    url: BASE_URL + '/users/password',
    method: 'PUT',
    data: {
      current_password: currentPassword,
      new_password: newPassword
    }
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

module.exports.getOneById = function (id) {
  return Qajax({
    url: BASE_URL + '/users/' + id,
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
}

module.exports.delete = function (id) {
  return Qajax({
    url: BASE_URL + '/users/' + id,
    method: 'DELETE'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

module.exports.update = function (id, user) {
  return Qajax({
    url: BASE_URL + '/users/' + id,
    method: 'PUT',
    data: user
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON);
};

