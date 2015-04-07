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
    'updateGroup': {},
    'deleteGroup': {}
});

module.exports = GroupsActions;
