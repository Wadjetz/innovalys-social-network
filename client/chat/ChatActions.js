const AppDispatcher = require('../app/AppDispatcher');
const ChatConstants = require('./ChatConstants');

const ChatActions = {
    loadMessages: function () {
        AppDispatcher.handleViewAction({
            actionType: ChatConstants.LOAD_MESSAGES
        });
    },
    sendMessage: function (message) {
        AppDispatcher.handleViewAction({
            actionType: ChatConstants.SEND_MESSAGE,
            message: message
        });
    }
};

module.exports = ChatActions;
