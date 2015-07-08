import React from 'react/addons';
import Bootstrap, { Row, Col, Input, Label, Button } from 'react-bootstrap';
import Router, { Link, Navigation } from 'react-router';
import i18n from '../../commun/local';
import ChatActions from '../chat/ChatActions';

export default React.createClass({
  displayName: "User",
  render: function () {
    let user = this.props.user;
    let connect = (user.status_connection == 'online')
                  ? <Label bsStyle='success'>online</Label>
                  : <Label>offline</Label>
    return (
      <div style={{ marginBottom: 15 }}>
        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object img-circle" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg==" alt="..." />
            </a>
          </div>
          <div className="media-body">
            <h4>
              <Link to="profil" params={{id: user.id}}>{user.first_name} {user.last_name}</Link>
            </h4>
            <p>
               {connect} <Label bsStyle='info'>{user.function}</Label> <Label bsStyle='info'>{user.role}</Label>
            </p>
            <Button onClick={this.chatRoom}>{i18n.__n('message')}</Button>
          </div>
        </div>
      </div>
    );
  },

  chatRoom: function () {
    ChatActions.joinUserRoom(this.props.user);
  }

});
