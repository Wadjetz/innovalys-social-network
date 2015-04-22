var Reflux = require('reflux');

var GroupsActions = Reflux.createActions({
    'loadGroups': {},
    'loadSingleGroup': {
        children: [
            "completed",
            "failed"
        ]
    },
    'createGroup': {
        children: [
            "completed"
        ]
    },
    'joinGroup': {
        children: [
            "completed",
            "failed"
        ]
    },
    'updateGroup': {},
    'deleteGroup': {}
});

module.exports = GroupsActions;
