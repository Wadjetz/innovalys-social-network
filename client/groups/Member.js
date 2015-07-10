import React from 'react';
import Bootstrap, { Label, Button } from 'react-bootstrap';
import moment from 'moment';
import GroupsService from './GroupsService';
import If from '../utils/If';

export default React.createClass({
  displayName: "Member",
  render: function () {
    let memeber = this.props.memeber;
    return (
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg==" alt="..." />
          </a>
        </div>
        <div className="media-body">
          <h4>{memeber.first_name} {memeber.last_name}</h4>
          <p>
            <Label bsStyle='info'>{memeber.function}</Label> <Label bsStyle='info'>{memeber.role}</Label>
          </p>
          <If condition={this.props.isAccepted === false}>
            <p>
              <Button onClick={this.accept}>Accept</Button>
              <Button onClick={this.refuse}>Refuse</Button>
            </p>
          </If> 
        </div>
      </div>
    );
  },

  accept: function () {
    GroupsService.acceptMember(this.props.memeber.id, this.props.group.id).then(result => {
      console.log("accept ok", result);
    }).fail(err => {
      console.log("accept err", err);
    });
  },

  refuse: function () {
    GroupsService.refuseMember(this.props.memeber.id, this.props.group.id).then(result => {
      console.log("refuse ok", result);
    }).fail(err => {
      console.log("refuse err", err);
    });
    console.log("refuse");
  }

});
