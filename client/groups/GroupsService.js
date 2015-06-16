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

  getBySlug: function (slug) {
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
  },

  getMessagesGroups: function (slug) {
    return Qajax({
      url: BASE_URL + "/groups/messages/" + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  createMessageGroup: function (slug, message) {
    return Qajax({
      url: BASE_URL + "/groups/messages/" + slug,
      method: 'POST',
      data: {
        content: message
      }
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  getGroupsTypes: function () {
    return Qajax({
      url: BASE_URL + "/groups/types",
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  },

  uploadFile: function (slug, file) {
    return new Promise((resolve, reject) => {
      var formData = new FormData();
      formData.append("file", file[0]);
      var request = new XMLHttpRequest();
      request.open("POST", BASE_URL + "/groups/files/" + slug);
      request.onload = function (res) {
        var r = res.srcElement || res.target;
        if (r.status === 200) {
          resolve(JSON.parse(r.response));
        } else {
          reject(r.response);
        }
      }
      request.onerror = function (err) {
        reject(err)
      }
      request.send(formData);
    });
  },

  getFiles: function (slug) {
    return Qajax({
      url: BASE_URL + "/groups/files/" + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  }
};
