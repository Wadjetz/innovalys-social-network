import React from 'react'
import Bootstrap, { Row, Col, Input, Button } from 'react-bootstrap'
import ChatActions from './ChatActions'
import ChatStore from './ChatStore'
import MessageSender from './MessageSender'
import i18n from '../../commun/local'

const style = {
  height: '200px',
  marginBottom: '10px',
  padding: '2px',
  border: '1px solid #999',
  borderRadius: '3px',
  overflowX: 'auto',
  overflowY: 'auto'
};

function getMessages() {
  return {
    messages: ChatStore.getMessages()
  };
}

export default React.createClass({
  displayName: "Chat",
  render: function () {
    let messages = this.state.messages.map((message, i) => (<div key={i}>{message.content}</div>));
    return (
      <Row>
        <h2>{i18n.__n('chat.chat')}</h2>
        <div style={style}>
          {messages}
        </div>
        <MessageSender />
      </Row>
    );
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
