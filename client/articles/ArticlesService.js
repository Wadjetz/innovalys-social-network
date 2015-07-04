import Qajax from 'qajax'

const BASE_URL = document.location.origin;

export default {

  findAll: function () {
    return Qajax({
      url: BASE_URL + '/news',
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  findMyGroups: function (user) {
    throw new Error("findMyGroups not implemented");
  },

  get: function (slug) {
    return Qajax({
      url: BASE_URL + '/news/' + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  create: function (article) {
    return Qajax({
      url: BASE_URL + '/news/',
      method: 'POST',
      data: article
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  }

};
