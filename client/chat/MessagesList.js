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

/**
 * Messages List components
 */
export default class MessagesList extends React.Component {
  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    let messagesView = this.props.messages.map((message, i) => {
      return (<div key={i}>{message.first_name} {message.last_name} : {message.content}</div>);
    });
    return (
      <div style={messagesStyle}>
        {messagesView}
      </div>
    );
  }
}
