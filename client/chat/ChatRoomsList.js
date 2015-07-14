import React from 'react';
import ChatActions from './ChatActions';
import ChatStore from './ChatStore';

const roomsStyle = {
  width: '100%',
  height: '234px',
  verticalAlign: 'top',
  display: 'inline-block',
  overflowX: 'auto',
  overflowY: 'auto'
};

/**
 * Chat Rooms List components
 */
export default class ChatRoomsList extends React.Component {
  /**
   * Render components
   * @return {ReactDOM} View
   */
  render () {
    let roomsView = this.props.rooms.map((room, i) => {
      return (<div className="chat-room" key={room.id} onClick={this.handleSwitchRoom(room)}>{room.name}</div>);
    });
    return (
      <div style={roomsStyle}>
        {roomsView}
      </div>
    );
  }

  /**
   * Handle Switch Room
   * @param  {string} room Room Name
   * @return {void}
   */
  handleSwitchRoom(room) {
    return function () {
      ChatActions.switchRoom(room.name);
    };
  }
}
