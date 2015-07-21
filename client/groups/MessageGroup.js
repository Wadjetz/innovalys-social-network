import React from 'react';
import Bootstrap, { Label, Button } from 'react-bootstrap';
import If from '../utils/If';
import moment from 'moment';
import i18n from '../../commun/local';

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
    this.update = this.update.bind(this);
  }

  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    let message = this.props.message;
    let me = this.props.me.me;
    return (
      <div className="thumbnail">
        <p>{message.content}</p>
        <p>
          <Label bsStyle='primary'>by {message.first_name} {message.last_name}</Label> <Label bsStyle='info'>{message.function}</Label> <Label bsStyle='info'>{message.role}</Label> <Label bsStyle='default'>{moment(message.created).fromNow()}</Label>
        </p>
        <If condition={me.id === message.users_id || me.role === "admin"}>
          <div>
            <Button bsStyle='primary' bsSize='xsmall' onClick={this.update}>{i18n.__n('update')}</Button>
            <Button bsStyle='warning' bsSize='xsmall' onClick={this.delete}>{i18n.__n('delete')}</Button>
          </div>
        </If>
      </div>
    );
  }

  delete() {
    this.props.deleteAction(this.props.message);
  }

  update() {
    console.debug("MessageGroup update", this.props);
    this.props.updateAction(this.props.message);
  }
};
