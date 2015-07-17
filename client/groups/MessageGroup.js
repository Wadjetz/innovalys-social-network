import React from 'react';
import Bootstrap, { Label, Button } from 'react-bootstrap';
import If from '../utils/If';
import moment from 'moment';

/**
 * MessageGroup components
 */
export default class MessageGroup extends React.Component {
  /**
   * constructor
   * @param  {object} props Props
   */
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    let message = this.props.message;
    let me = this.props.me.me;
    return (
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg==" alt="..." />
          </a>
        </div>
        <div className="media-body">
          <p>{message.content}</p>
          <p>
            <Label bsStyle='primary'>by {message.first_name} {message.last_name}</Label> <Label bsStyle='info'>{message.function}</Label> <Label bsStyle='info'>{message.role}</Label> <Label bsStyle='default'>{moment(message.created).fromNow()}</Label>
          </p>
          <If condition={me.id === message.users_id}>
            <Button onClick={this.delete}>Delete</Button>
          </If>
        </div>
      </div>
    );
  }

  delete() {
    this.props.deleteMessageGroup(this.props.message);
  }
};
