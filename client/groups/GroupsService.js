import Qajax from 'qajax'

const BASE_URL = document.location.origin;

class GroupsService {

  constructor(base_url) {
    this.base_url = base_url;
  }

  getAll() {
    return Qajax({
      url: this.base_url + '/groups',
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  getMyGroups() {
    return Qajax({
      url: this.base_url + '/groups/my-groups',
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  getBySlug(slug) {
    return Qajax({
      url: this.base_url + '/groups/by-slug/' + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  create(group) {
    return Qajax({
      url: this.base_url + '/groups',
      method: 'POST',
      data: group
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
  }

  join(group) {
    return Qajax({
      url: this.base_url + "/groups/members/join/" + group.slug,
      method: 'POST',
      data: group
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  getMessagesGroups(slug) {
    return Qajax({
      url: this.base_url + "/groups/messages/" + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  createMessageGroup(slug, message) {
    return Qajax({
      url: this.base_url + "/groups/messages/" + slug,
      method: 'POST',
      data: {
        content: message
      }
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  getGroupsTypes() {
    return Qajax({
      url: this.base_url + "/groups/types",
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  uploadFile(slug, file) {
    return new Promise((resolve, reject) => {
      var formData = new FormData();
      formData.append("file", file[0]);
      var request = new XMLHttpRequest();
      request.open("POST", this.base_url + "/groups/files/" + slug);
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
  }

  getFiles(slug) {
    return Qajax({
      url: this.base_url + "/groups/files/" + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  getMembers(slug) {
    return Qajax({
      url: this.base_url + "/groups/members/" + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  getPendingMembers(slug) {
    return Qajax({
      url: this.base_url + "/groups/members/pending/" + slug,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  acceptMember(users_id, groups_id) {
    return Qajax({
      url: this.base_url + "/groups/members/accept/" + groups_id + "/" + users_id,
      method: 'PUT'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  refuseMember(users_id, groups_id) {
    return Qajax({
      url: this.base_url + "/groups/members/refuse/" + groups_id + "/" + users_id,
      method: 'PUT'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }
}

export default new GroupsService(BASE_URL);
