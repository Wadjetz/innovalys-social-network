import React from 'react';
import ChatActions from './ChatActions';
import ChatStore from './ChatStore';

const roomsStyle = {
  width: '100%',
  height: '200px',
  verticalAlign: 'top',
  display: 'inline-block',
  overflowX: 'auto',
  overflowY: 'auto'
};

export default React.createClass({
  displayName: "ChatRoomsList",
  render: function () {
    let roomsView = this.props.rooms.map((room, i) =>
      <div key={room.id} onClick={this.handleSwitchRoom(room)}>{room.name}</div>
    );

    return (
      <div style={roomsStyle}>
        {roomsView}
      </div>
    );
  },

  handleSwitchRoom: function (room) {
    return function () {
      ChatActions.switchRoom(room.name);
    };
  }
});
