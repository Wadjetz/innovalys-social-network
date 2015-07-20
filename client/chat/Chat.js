import React from 'react';
import { Button } from 'react-bootstrap';
import ChatActions from './ChatActions';
import ChatStore from './ChatStore';
import MessageSender from './MessageSender';
import i18n from '../../commun/local';
import If from '../utils/If';
import ChatRoomsList from './ChatRoomsList';
import MessagesList from './MessagesList';

const Storage = localStorage;

const wrapStyle = {
  width: '400px',
  position: 'fixed',
  right: 20,
  bottom: 0,
  backgroundColor: "#FFF",
  padding: '3px',
  border: '1px solid #999',
  borderRadius: '3px',
  boxShadow: '0 0 4px 1px #858585'
};

const buttonStyle = {
  position: 'absolute',
  right: 3,
  top: 7
};

const buttonBackStyle = {
  position: 'absolute',
  right: 50,
  top: 7
};

function getMessages() {
  return ChatStore.getChatData();
}

if(!Storage.getItem("hideChat")) {
  Storage.setItem("hideChat", "true");
}

export default React.createClass({
  displayName: "Chat",
  render: function () {
    let messages = this.state.messages.map((message, i) =>
      <div key={i}>{message.first_name} {message.last_name} : {message.content}</div>
    );

    let hideChat = Storage.getItem("hideChat");
    return (
      <div style={wrapStyle}>
        <h4>{i18n.__n('chat')} {i18n.__n('room') + ": " + this.state.room}</h4>
        <button style={buttonStyle} type="button" className="btn btn-default btn-sm" onClick={this.hideChat}>
          <span className={(hideChat === "true") ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-up"}></span>
        </button>
        <If condition={hideChat === "true"}>
          <div>
            <If condition={this.state.room === ""}>
              <ChatRoomsList rooms={this.state.rooms} />
            </If>
            <If condition={this.state.room !== ""}>
              <div>
                <button style={buttonBackStyle} type="button" className="btn btn-default btn-sm" onClick={this.handleBack}>
                  {i18n.__n('back')}
                </button>
                <MessagesList messages={this.state.messages} />
                <MessageSender />
              </div>
            </If>
          </div>
        </If>
      </div>
    );
  },

  hideChat: function () {
    let hideChat = Storage.getItem("hideChat");
    if (hideChat === "true") {
      Storage.setItem("hideChat", "false");
    }
    if (hideChat === "false") {
      Storage.setItem("hideChat", "true");
    }
    this.setState({});
  },

  handleBack: function () {
    ChatActions.leaveRoom();
  },

  getInitialState: function () {
    return getMessages();
  },
  onChange: function () {
    this.setState(getMessages());
  },
  componentDidMount: function () {
    ChatStore.disconnect();
    ChatStore.connect();
    ChatActions.switchRoom('global_chat');
    ChatStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    ChatStore.disconnect();
    ChatStore.removeChangeListener(this.onChange);
  }
});

