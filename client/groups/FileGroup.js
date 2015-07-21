import React from 'react';
import Bootstrap, { Label, Button } from 'react-bootstrap';
import moment from 'moment';
import i18n from '../../commun/local';
import GroupActions from './GroupActions';
import If from '../utils/If';

function isAuthorized(me, file) {
  return (me.role === 'admin') || (me.role === 'chef') || (me.id === file.users_id);
}

export default React.createClass({
  render: function () {
    let me = this.props.me;
    let file = this.props.file;
    return (
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg==" alt="..." />
          </a>
        </div>
        <div className="media-body">
          <h4>{file.name}</h4>
          <p>
            <Label bsStyle='primary'>by {file.first_name} {file.last_name}</Label> <Label bsStyle='info'>{file.function}</Label> <Label bsStyle='info'>{file.role}</Label> <Label bsStyle='default'>{moment(file.created).fromNow()}</Label>
          </p>
          <a className="btn btn-default" href={`/groups/files/download/${this.props.slug}/${file.id}`}>{i18n.__n('download')}</a>
          <If condition={isAuthorized(me, file)}>
            <Button bsStyle='danger' onClick={this.onDelete}>{i18n.__n('delete')}</Button>
          </If>
        </div>
      </div>
    );
  },

  onDelete: function () {
    GroupActions.deleteGroupFile(this.props.file, this.props.slug);
  }

});
