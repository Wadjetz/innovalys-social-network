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
      <div className="thumbnail">
        <h4>{file.name}</h4>
        <p>
          <Label bsStyle='primary'>by {file.first_name} {file.last_name}</Label> <Label bsStyle='info'>{file.function}</Label> <Label bsStyle='info'>{file.role}</Label> <Label bsStyle='default'>{moment(file.created).fromNow()}</Label>
        </p>
        <a className="btn btn-default" href={`/groups/files/download/${this.props.slug}/${file.id}`}>{i18n.__n('download')}</a>
        <If condition={isAuthorized(me, file)}>
          <Button bsStyle='danger' onClick={this.onDelete}>{i18n.__n('delete')}</Button>
        </If>
      </div>
    );
  },

  onDelete: function () {
    GroupActions.deleteGroupFile(this.props.file, this.props.slug);
  }

});
