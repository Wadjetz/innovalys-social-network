/**
 * Created by Damien on 16/06/2015.
 */
const assign        = require('lodash/object/assign');
const socket        = io(document.location.host);
const notification = require("notification");
const Store = require('../flux/Store');

var _data = {
    messages: []
}

const NotificationStore = assign(Store, {
    connect: function () {
        //console.info("ChatStore.connect.global_chat");
        socket.on('global_notification', (msg) => {
            _data.messages.push(msg);
            //console.debug("global_chat", "msg", msg, "this.data.messages", _data.messages);
            console.log(msg);
            notification.newNotification(msg);
            NotificationStore.emitChange();
        });
    },
    getMessages: function () {
        return _data.messages;
    }
});

module.exports = NotificationStore;
