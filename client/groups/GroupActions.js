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

/**
 * CREATE_MESSAGE Constants
 * @type {String}
 */
export const CREATE_MESSAGE = 'CREATE_MESSAGE';

/**
 * Group Actions
 */
class GroupActions {
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
      console.debug("GroupActions.loadGroup err", err);
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
      console.debug("GroupActions.loadGroup err", err);
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
      console.debug("GroupActions.loadGroup err", err);
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
      console.debug("GroupActions.loadGroup err", err);
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
      console.debug("GroupActions.loadGroup err", err);
    });
  }

}

export default new GroupActions();
