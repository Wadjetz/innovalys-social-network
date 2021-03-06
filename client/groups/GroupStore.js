import _ from 'lodash';
import AppDispatcher from '../app/AppDispatcher';
import {
  LOAD_GROUP, LOAD_GROUP_MESSAGES, LOAD_GROUP_FILES, LOAD_GROUP_MEMBERS, LOAD_GROUP_NEW_MEMBERS,
  CREATE_GROUP_MESSAGE, DELETE_GROUP_MEMBER, DELETE_GROUP_FILE, UPDATE_GROUP, ACCEPT_MEMBER,
  DELETE_GROUP_MESSAGE, LOAD_GROUP_POTANTIAL_MEMBERS, ADD_GROUP_MEMBERS
} from './GroupActions';
import Store from '../flux/Store';

var _groupData = {
  group: {
    id: 0,
    slug: "",
    name: "",
    description: "",
    created: "",
    updated: "",
    status: "",
    access: "",
    type: "",
    users_id: "",
  },
  messages: [],
  members: [],
  newMembers: [],
  files: [],
  potantialMembers: []
  // file: null,
  // wantToUpdateMessage: ""
};

var GroupStore = _.assign(Store, {
  getGroupData: function () {
    return _groupData;
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {
      case LOAD_GROUP:
          //console.debug('LOAD_GROUP', action);
          _groupData.group = action.group;
          GroupStore.emitChange();
        break;
      case LOAD_GROUP_MESSAGES:
          //console.debug('LOAD_GROUP_MESSAGES', action);
          _groupData.messages = action.messages;
          GroupStore.emitChange();
        break;
      case LOAD_GROUP_FILES:
          //console.debug('LOAD_GROUP_FILES', action);
          _groupData.files = action.files;
          GroupStore.emitChange();
        break;
      case LOAD_GROUP_MEMBERS:
          //console.debug('LOAD_GROUP_MEMBERS', action);
          _groupData.members = action.members;
          GroupStore.emitChange();
        break;
      case LOAD_GROUP_NEW_MEMBERS:
          //console.debug('LOAD_GROUP_NEW_MEMBERS', action);
          _groupData.newMembers = action.newMembers;
          GroupStore.emitChange();
        break;
      case CREATE_GROUP_MESSAGE:
          //console.debug('CREATE_GROUP_MESSAGE', action);
          _groupData.messages.push(action.createdMessage);
          GroupStore.emitChange();
        break;
      case DELETE_GROUP_MEMBER:
        //console.debug('DELETE_GROUP_MEMBER', action);
        _groupData.newMembers = _groupData.newMembers.filter(m => m.id !== action.id);
        _groupData.members = _groupData.members.filter(m => m.id !== action.id);
        GroupStore.emitChange();
        break;
      case DELETE_GROUP_FILE:
        //console.debug('DELETE_GROUP_FILE', action);
        _groupData.files = _groupData.files.filter(f => {
          return f.id !== action.file.id;
        });
        GroupStore.emitChange();
        break;
      case UPDATE_GROUP:
        //console.debug('UPDATE_GROUP', action);
        _groupData.group = action.updatedGroup;
        GroupStore.emitChange();
        break;
      case ACCEPT_MEMBER:
        console.debug('ACCEPT_MEMBER', action);
        _groupData.members.push(action.memeber);
        _groupData.newMembers = _groupData.newMembers.filter(m => m.id !== action.memeber.id);
        GroupStore.emitChange();
        break;
      case DELETE_GROUP_MESSAGE:
        console.debug('DELETE_GROUP_MESSAGE', action);
        _groupData.messages = _groupData.messages.filter(m => m.id !== action.message.id);
        GroupStore.emitChange();
        break;
      case LOAD_GROUP_POTANTIAL_MEMBERS:
        console.log('LOAD_GROUP_POTANTIAL_MEMBERS', action.result);
        _groupData.potantialMembers = action.result;
        GroupStore.emitChange();
        break;
      case ADD_GROUP_MEMBERS:
        _groupData.members.push(action.member);
        _groupData.potantialMembers = _groupData.potantialMembers.filter(m => m.id !== action.member.id)
        GroupStore.emitChange();
        console.log('ADD_GROUP_MEMBERS', action);
        break;
    }
    return true;
  })
});

export default GroupStore;
