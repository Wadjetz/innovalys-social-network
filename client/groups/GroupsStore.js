const assign          = require('lodash/object/assign');
const AppDispatcher   = require('../app/AppDispatcher');
const GroupsConstants = require('./GroupsConstants');
const GroupsActions   = require('./GroupsActions');
const GroupsApi       = require('./GroupsApi');
const Store           = require('../flux/Store');

var _data = {
    groups: [],
    singleGroup: {
        group: {},
        members: []
    },
    createdGroup: {},
    createGroupError: {}
};

const GroupsStore = assign(Store, {
    getGroups: function () {
        return _data.groups;
    },
    getSingleGroup: function () {
        return _data.singleGroup;
    },
    getCreatedGroup: function () {
        return _data.createdGroup;
    },
    getCreateGroupError: function () {
        return _data.createGroupError;
    },
    dispatcherIndex: AppDispatcher.register((payload) => {
        let action = payload.action;
        switch(action.actionType) {
            case GroupsConstants.LOAD_GROUPS:
                GroupsApi.getAll((err, groups) => {
                    console.debug("GroupsStore.dispatcherIndex.LOAD_GROUPS", "action", action, "groups", groups);
                    // TODO handle errors
                    _data.groups = groups;
                    GroupsStore.emitChange();
                });
                break;
            case GroupsConstants.LOAD_SINGLE_GROUP:
                GroupsApi.get(action.slug, (err, singleGroup) => {
                    console.debug("GroupsStore.dispatcherIndex.LOAD_SINGLE_GROUP", "action", action, "singleGroup", singleGroup);
                    // TODO handle errors
                    _data.singleGroup = singleGroup;
                    GroupsStore.emitChange();
                });
                break;
            case GroupsConstants.CREATE_GROUP:
                GroupsApi.create(action.newGroup, (err, result) => {
                    console.debug("GroupsStore.dispatcherIndex.CREATE_GROUP", "action", action, "result", result, "err", err);
                    if (err) {
                        _data.createGroupError = err;
                    } else {
                        _data.createdGroup = result;
                    }
                    GroupsStore.emitChange();
                });
                break;
            case GroupsConstants.JOIN_GROUP:
                GroupsApi.join(action.group, (err, result) => {
                    console.debug("GroupsStore.dispatcherIndex.CREATE_GROUP", "action", action, "result", result);
                    GroupsStore.emitChange();
                });
                break;
        }
        return true;
    })
});

module.exports = GroupsStore;
