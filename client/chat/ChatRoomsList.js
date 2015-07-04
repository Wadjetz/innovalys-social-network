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
    let myGroupsView = this.props.myGroups.map((myGroup, i) =>
      <div key={myGroup.id} onClick={this.handleSetRoom(myGroup)}>{myGroup.slug}</div>
    );

    return (
      <div style={roomsStyle}>
        {myGroupsView}
      </div>
    );
  },

  handleSetRoom: function (myGroup) {
    return function () {
      ChatActions.setRoom(myGroup.slug);
    };
  }
});
