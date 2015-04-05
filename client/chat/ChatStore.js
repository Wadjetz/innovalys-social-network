var Reflux = require('reflux');

var socket = io('http://localhost');

var ChatActions = require('./ChatActions');

var ChatStore = Reflux.createStore({
    data: {
        messages: []
    },
    getInitialState: function () {
        return this.data;
    },
    init: function () {
        this.listenTo(ChatActions.loadMessages, this.onLoadMessages);
        this.listenTo(ChatActions.sendMessage, this.onSendMessage);
        socket.on('global_chat', function (msg) {
            this.data.messages.push(msg);
            this.trigger(this.data);
        }.bind(this));
    },
    onLoadMessages: function () {
		console.log("ChatStore", "onLoadMessages");
    },
    onSendMessage: function (message) {
        console.log("ChatStore", "onSendMessage", message);
        socket.emit('global_chat', message);
    }
});

module.exports = ChatStore;
