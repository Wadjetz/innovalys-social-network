import Qajax from 'qajax';
import { BASE_URL } from '../conf';

/**
 * Groups Service who use server API for groups
 */
class GroupsService {
  /**
   * Constructor
   * @param  {string} url Api Base Url 
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Get all groups
   * @return {promise} list of groups
   */
  getAll() {
    return Qajax({
      url: `${this.url}/groups`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get my groups
   * @return {promise} List of groups
   */
  getMyGroups() {
    return Qajax({
      url: `${this.url}/groups/my-groups`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get group by slug
   * @param  {string} slug Group slug
   * @return {promise} Group
   */
  getBySlug(slug) {
    return Qajax({
      url: `${this.url}/groups/by-slug/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Create new group
   * @param  {Group} group Group object
   * @return {promise} Created Group
   */
  create(group) {
    return Qajax({
      url: `${this.url}/groups`,
      method: 'POST',
      data: group
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Join group
   * @param  {Group} group Group object
   * @return {promise}       Result
   */
  join(group) {
    return Qajax({
      url: `${this.url}/groups/members/join/${group.slug}`,
      method: 'POST',
      data: group
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get Groups Messages
   * @param  {string} slug Groups slug
   * @return {promise}      List of groups messages
   */
  getMessagesGroups(slug) {
    return Qajax({
      url: `${this.url}/groups/messages/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Create group message
   * @param  {string} slug    Group slug
   * @param  {Message} message Group message object
   * @return {promise}         Created group message
   */
  createMessageGroup(slug, message) {
    return Qajax({
      url: `${this.url}/groups/messages/${slug}`,
      method: 'POST',
      data: {
        content: message
      }
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Delete group message
   * @param  {Message} message Group message object
   * @return {promise}         Result
   */
  deleteMessageGroup(message) {
    return Qajax({
      method: 'DELETE',
      url: `${this.url}/groups/messages/${message.id}`
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Update group message
   * @param  {Message} message Group message object
   * @return {promise}         Result
   */
  updateMessageGroup(message) {
    console.log("updateMessageGroup", message);
    return Qajax({
      method: 'PUT',
      url: `${this.url}/groups/messages/${message.id}`,
      data: message
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get group type
   * @return {promise} List of group types
   */
  getGroupsTypes() {
    return Qajax({
      url: `${this.url}/groups/types`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Upload group document file
   * @param  {string} slug Group slug
   * @param  {File} file File
   * @return {promise}      Uploaded File
   */
  uploadFile(slug, file) {
    return new Promise((resolve, reject) => {
      var formData = new FormData();
      formData.append("file", file[0]);
      var request = new XMLHttpRequest();
      request.open("POST", `${this.url}/groups/files/${slug}`);
      request.onload = function (res) {
        var r = res.srcElement || res.target;
        if (r.status === 200) {
          resolve(JSON.parse(r.response));
        } else {
          reject(r.response);
        }
      };
      request.onerror = function (err) {
        reject(err);
      };
      request.send(formData);
    });
  }

  /**
   * Get group document files
   * @param  {string} slug Group slug
   * @return {promise}      List of files
   */
  getFiles(slug) {
    return Qajax({
      url: `${this.url}/groups/files/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get groups members
   * @param  {string} slug Group slug
   * @return {promise}      List of members
   */
  getMembers(slug) {
    return Qajax({
      url: `${this.url}/groups/members/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get group member with pending status
   * @param  {string} slug Group slug
   * @return {promise}      List of members
   */
  getPendingMembers(slug) {
    return Qajax({
      url: `${this.url}/groups/members/pending/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Accept group member
   * @param  {number} users_id  User id
   * @param  {number} groups_id Group id
   * @return {promise}           Result
   */
  acceptMember(users_id, groups_id) {
    return Qajax({
      url: `${this.url}/groups/members/accept/${groups_id}/${users_id}`,
      method: 'PUT'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Refuse group member
   * @param  {number} users_id  User id
   * @param  {number} groups_id Group id
   * @return {promise}           Result
   */
  refuseMember(users_id, groups_id) {
    return Qajax({
      url: `${this.url}/groups/members/refuse/${groups_id}/${users_id}`,
      method: 'PUT'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Delete group
   * @param  {string} slug Group slug
   * @return {promise}      Delete result
   */
  delete(slug) {
    return Qajax({
      url: `${this.url}/groups/${slug}`,
      method: 'DELETE'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Update group
   * @param  {string} slug  Group slug
   * @param  {Group} group Group object
   * @return {promise}       Updated Group
   */
  update(slug, group) {
    return Qajax({
      url: `${this.url}/groups/${slug}`,
      method: 'PUT',
      data: group
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Delete group file
   * @param  {File} file Group file
   * @return {promise}      Result
   */
  deleteGroupFile(file) {
    return Qajax({
      url: `${this.url}/groups/files/${file.id}`,
      method: 'DELETE'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }
}

export default new GroupsService(BASE_URL);
