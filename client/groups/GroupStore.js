import _ from 'lodash';
import AppDispatcher from '../app/AppDispatcher';
import { LOAD_GROUP, LOAD_GROUP_MESSAGES, LOAD_GROUP_FILES, LOAD_GROUP_MEMBERS, LOAD_GROUP_NEW_MEMBERS } from './GroupActions';
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
          console.debug('LOAD_GROUP', action);
          _groupData.group = action.group;
          GroupStore.emitChange();
        break;
      case LOAD_GROUP_MESSAGES:
          console.debug('LOAD_GROUP_MESSAGES', action);
          _groupData.messages = action.messages;
          GroupStore.emitChange();
        break;
      case LOAD_GROUP_FILES:
          console.debug('LOAD_GROUP_FILES', action);
          _groupData.files = action.files;
          GroupStore.emitChange();
        break;
      case LOAD_GROUP_MEMBERS:
          console.debug('LOAD_GROUP_MEMBERS', action);
          _groupData.members = action.members;
          GroupStore.emitChange();
        break;
      case LOAD_GROUP_NEW_MEMBERS:
          console.debug('LOAD_GROUP_NEW_MEMBERS', action);
          _groupData.newMembers = action.newMembers;
          GroupStore.emitChange();
        break;
    }
    return true;
  })
});

export default GroupStore;
