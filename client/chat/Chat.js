import React from 'react'
import Bootstrap, { Row, Col, Input, Button } from 'react-bootstrap'
import ChatActions from './ChatActions'
import ChatStore from './ChatStore'
import MessageSender from './MessageSender'
import i18n from '../../commun/local'
import If from '../utils/If'

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
  borderRadius: '3px'
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

export default React.createClass({
  displayName: "Chat",
  render: function () {
    let messages = this.state.messages.map((message, i) => {
      return <div key={i}>{message.first_name} {message.last_name} : {message.content}</div>
    });
    return (
      <div style={wrapStyle}>
        <h4>{i18n.__n('chat')}</h4>
        <button style={buttonStyle} type="button" className="btn btn-default btn-sm" onClick={this.hideChat}>
          <span className={(this.state.isChatVisible)? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-up"}></span>
        </button>
        <If condition={this.state.isChatVisible}>
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
    this.setState({
      isChatVisible: !this.state.isChatVisible
    });
    console.log(this.state.isChatVisible);
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
