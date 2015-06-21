import React from 'react'
import Bootstrap, { Row, Col, Input, Button } from 'react-bootstrap'
import ChatActions from './ChatActions'
import ChatStore from './ChatStore'
import MessageSender from './MessageSender'
import i18n from '../../commun/local'
import If from '../utils/If'
const Storage = localStorage;

const messagesStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  height: '200px',
  width: '340px',
};

const wrapStyle = {
  width: '350px',
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
  top: 7,
};

function getMessages() {
  return {
    messages: ChatStore.getMessages(),
    isChatVisible: false,
    nbMessages: 0,
    nbUsers: 0
  };
}

if(!Storage.getItem("hideChat")) {
  Storage.setItem("hideChat", "true");
}

export default React.createClass({
  displayName: "Chat",
  render: function () {
    let messages = this.state.messages.map((message, i) => {
      return <div key={i}>{message.first_name} {message.last_name} : {message.content}</div>
    });
    let hideChat = Storage.getItem("hideChat");
    return (
      <div style={wrapStyle}>
        <h4>{i18n.__n('chat')}</h4>
        <button style={buttonStyle} type="button" className="btn btn-default btn-sm" onClick={this.hideChat}>
          <span className={(hideChat === "true")? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-up"}></span>
        </button>
        <If condition={hideChat === "true"}>
          <div>
            <div style={messagesStyle}>
              {messages}
            </div>
            <MessageSender />
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
  getInitialState: function () {
    ChatActions.loadMessages();
    return getMessages();
  },
  onChange: function () {
    this.setState(getMessages());
  },
  componentDidMount: function () {
    ChatStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    ChatStore.removeChangeListener(this.onChange);
  }
});
