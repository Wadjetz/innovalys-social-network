var Reflux = require('reflux');

var ChatActions = Reflux.createActions({
    'loadMessages': {
        children: [
            "completed",
            "failed"
        ]
    },
    'sendMessage': {
        children: [
            "completed",
            "failed"
        ]
    }
});

module.exports = ChatActions;
