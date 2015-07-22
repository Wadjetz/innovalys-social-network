import AppDispatcher from '../app/AppDispatcher';
import GroupsService from './GroupsService';
import AppActions from '../app/AppActions';
/**
 * LOAD_GROUP Constants
 * @type {String}
 */
export const LOAD_GROUP = 'LOAD_GROUP';
export const LOAD_GROUP_MESSAGES = 'LOAD_GROUP_MESSAGES';
export const LOAD_GROUP_FILES = 'LOAD_GROUP_FILES';
export const LOAD_GROUP_MEMBERS = 'LOAD_GROUP_MEMBERS';
export const LOAD_GROUP_NEW_MEMBERS = 'LOAD_GROUP_NEW_MEMBERS';
export const LOAD_GROUP_POTANTIAL_MEMBERS = 'LOAD_GROUP_POTANTIAL_MEMBERS';
export const ADD_GROUP_MEMBERS = 'ADD_GROUP_MEMBERS';

export const DELETE_GROUP_MEMBER = 'DELETE_GROUP_MEMBER';
export const DELETE_GROUP_FILE = 'DELETE_GROUP_FILE';
export const DELETE_GROUP_MESSAGE = 'DELETE_GROUP_MESSAGE';

export const UPDATE_GROUP = 'UPDATE_GROUP';

export const ACCEPT_MEMBER = 'ACCEPT_MEMBER';

/**
 * CREATE_GROUP_MESSAGE Constants
 * @type {String}
 */
export const CREATE_GROUP_MESSAGE = 'CREATE_GROUP_MESSAGE';

/**
 * Group Actions
 */
class GroupActions {

  loadPotantialMembers(slug) {
    GroupsService.loadPotantialMembers(slug).then(result => {
      AppDispatcher.handleViewAction({
        actionType: LOAD_GROUP_POTANTIAL_MEMBERS,
        result: result
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions loadGroupPotentialUsers err", err);
    });
  }

  addGroupMember(slug, member) {
    GroupsService.addGroupMember(slug, member).then(result => {
      console.log("addGroupMember", result);
      AppDispatcher.handleViewAction({
        actionType: ADD_GROUP_MEMBERS,
        result: result,
        member: member
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions loadGroupPotentialUsers err", err);
    });
  }

  deleteMessageGroup(message) {
    GroupsService.deleteMessageGroup(message).then(result => {
      AppDispatcher.handleViewAction({
        actionType: DELETE_GROUP_MESSAGE,
        result: result,
        message: message
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions deleteMessageGroup err", err);
    });
  }

  acceptMember(memeber, group) {
    GroupsService.acceptMember(memeber.id, group.id).then(result => {
      AppDispatcher.handleViewAction({
        actionType: ACCEPT_MEMBER,
        result: result,
        memeber: memeber
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions acceptMember err", err);
    });
  }

  updateGroup(slug, group) {
    GroupsService.update(slug, group).then(updatedGroup => {
      AppDispatcher.handleViewAction({
        actionType: UPDATE_GROUP,
        updatedGroup: updatedGroup
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions deleteGroupMember err", err);
    });
  }

  /**
   * Send CREATE_GROUP_MESSAGE action
   * @return {void}
   */
  deleteGroupMember(memberId, groupId) {
    GroupsService.refuseMember(memberId, groupId).then(result => {
      AppDispatcher.handleViewAction({
        actionType: DELETE_GROUP_MEMBER,
        id: memberId,
        result: result
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions deleteGroupMember err", err);
    });
  }

  /**
   * Send CREATE_GROUP_MESSAGE action
   * @return {void}
   */
  createGroupMessage(slug, newMessageContent) {
    GroupsService.createMessageGroup(slug, newMessageContent).then(createdMessage => {
      AppDispatcher.handleViewAction({
        actionType: CREATE_GROUP_MESSAGE,
        createdMessage: createdMessage
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions createGroupMessage err", err);
    });
  }


  /**
   * Send SWITCH_ROOM action
   * @return {void}
   */
  loadGroup(slug) {
    GroupsService.getBySlug(slug).then(group => {
      AppDispatcher.handleViewAction({
        actionType: LOAD_GROUP,
        group: group
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions loadGroup err", err);
    });
  }

  /**
   * Send LOAD_GROUP_MESSAGES action
   * @return {void}
   */
  loadGroupMessages(slug) {
    GroupsService.getMessagesGroups(slug).then(messages => {
      AppDispatcher.handleViewAction({
        actionType: LOAD_GROUP_MESSAGES,
        messages: messages
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions loadGroupMessages err", err);
    });
  }

  /**
   * Send LOAD_GROUP_FILES action
   * @return {void}
   */
  loadGroupFiles(slug) {
    GroupsService.getFiles(slug).then(files => {
      AppDispatcher.handleViewAction({
        actionType: LOAD_GROUP_FILES,
        files: files
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions loadGroupFiles err", err);
    });
  }

  /**
   * Send LOAD_GROUP_MEMBERS action
   * @return {void}
   */
  loadGroupMembers(slug) {
    GroupsService.getMembers(slug).then(members => {
      AppDispatcher.handleViewAction({
        actionType: LOAD_GROUP_MEMBERS,
        members: members
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions loadGroupMembers err", err);
    });
  }
  /**
   * Send LOAD_GROUP_MEMBERS action
   * @return {void}
   */
  loadGroupNewMembers(slug) {
    GroupsService.getPendingMembers(slug).then(newMembers => {
      AppDispatcher.handleViewAction({
        actionType: LOAD_GROUP_NEW_MEMBERS,
        newMembers: newMembers
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions loadGroupNewMembers err", err);
    });
  }

  deleteGroupFile(file, slug) {
    GroupsService.deleteGroupFile(file, slug).then(result => {
      AppDispatcher.handleViewAction({
        actionType: DELETE_GROUP_FILE,
        result: result,
        file: file
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.debug("GroupActions deleteGroupFile err", err);
    });
  }

}

export default new GroupActions();
