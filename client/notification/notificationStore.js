/**
 * Created by Damien on 16/06/2015.
 */
const assign        = require('lodash/object/assign');
const socket        = io(document.location.host);
const uniq          = require('lodash/array/uniq');
const AppDispatcher = require('../app/AppDispatcher');
const ChatConstants = require('./ChatConstants');
const ChatActions   = require('./ChatActions');
const ChatApi       = require('./ChatApi');

const Store = require('../flux/Store');

var _data = {
    messages: []
}

const NotificationStore = assign(Store, {
    connect: function () {
        //console.info("ChatStore.connect.global_chat");
        socket.on('global_notification', (msg) => {
            //console.debug("global_chat", "msg", msg, "this.data.messages", _data.messages);
            _data.messages.push(msg);
            NotificationStore.emitChange();
        });
    },
    getMessages: function () {
        return _data.messages;
    },
    dispatcherIndex: AppDispatcher.register((payload) => {
        let action = payload.action;
        switch(action.actionType) {
            case ChatConstants.LOAD_MESSAGES:
                ChatApi.getAllMessages(0, function (error, history) {
                    _data.messages = uniq(_data.messages.concat(history), 'id');
                    //console.debug("ChatStore.LOAD_MESSAGES", "action", action, "error", error, "history", history, "_data.messages", _data.messages);
                    NotificationStore.emitChange();
                });
                break;

            case ChatConstants.SEND_MESSAGE:
                socket.emit('global_notification', action.message);
                //console.debug("ChatStore.SEND_MESSAGE", "action", action);
                break;
        }
        return true;
    })
});

module.exports = NotificationStore;
