const GroupsConstants = require('./GroupsConstants');
const AppDispatcher   = require('../app/AppDispatcher');

const GroupsActions = {
    loadGroups: function () {
        AppDispatcher.handleViewAction({
            actionType: GroupsConstants.LOAD_GROUPS
        });
    },
    loadSingleGroup: function (slug) {
        AppDispatcher.handleViewAction({
            actionType: GroupsConstants.LOAD_SINGLE_GROUP,
            slug: slug
        });
    },
    createGroup: function (newGroup) {
        AppDispatcher.handleViewAction({
            actionType: GroupsConstants.CREATE_GROUP,
            newGroup: newGroup
        });
    },
    joinGroup: function (group) {
        AppDispatcher.handleViewAction({
            actionType: GroupsConstants.JOIN_GROUP,
            group: group
        });
    }
};

module.exports = GroupsActions;
