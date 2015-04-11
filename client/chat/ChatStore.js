var Reflux = require('reflux');
var _ = require('lodash');

var socket = io(document.location.host);

var ChatActions = require('./ChatActions');
var ChatApi = require('./ChatApi');

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
        ChatApi.getAllMessages(0, function (error, history) {
            this.data.messages = _.uniq(this.data.messages.concat(history), 'id');
            console.log("onLoadMessages", this.data.messages, history);
            this.trigger(this.data);
        }.bind(this));
    },
    onSendMessage: function (message) {
        console.log("ChatStore", "onSendMessage", message);
        socket.emit('global_chat', message);
    }
});

module.exports = ChatStore;
