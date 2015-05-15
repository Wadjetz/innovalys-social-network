import Qajax from 'qajax'

const BASE_URL = document.location.origin;

export default {
  getAll: function () {
    return Qajax({
      url: BASE_URL + '/groups',
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  getMyGroups: function () {
    return Qajax({
      url: BASE_URL + '/groups/my-groups',
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  get: function (slug) {
    return Qajax({
      url: BASE_URL + '/groups/by-slug/' + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  create: function (group) {
    return Qajax({
      url: BASE_URL + '/groups',
      method: 'POST',
      data: group
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  join: function (group) {
    return Qajax({
      url: BASE_URL + "/groups/members/join/" + group.slug,
      method: 'POST',
      data: group
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  }
};
