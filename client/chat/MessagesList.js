import React from 'react';
import ChatActions from './ChatActions';
import ChatStore from './ChatStore';

const messagesStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  height: '200px',
  width: '100%',
  verticalAlign: 'top',
  display: 'inline-block'
};

export default React.createClass({
  displayName: "MessagesList",
  render: function () {
    let messagesView = this.props.messages.map((message, i) =>
      <div key={i}>{message.first_name} {message.last_name} : {message.content}</div>
    );
    return (
      <div style={messagesStyle}>
        {messagesView}
      </div>
    );
  }
});