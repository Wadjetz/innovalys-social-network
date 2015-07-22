import React from 'react';
import Bootstrap, { Label, Button } from 'react-bootstrap';
import moment from 'moment';
import GroupsService from './GroupsService';
import If from '../utils/If';

/**
 * Member components
 */
export default class Member extends React.Component {
  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    let memeber = this.props.memeber;
    return (
      <div className="thumbnail">
        <h4>{memeber.first_name} {memeber.last_name}</h4>
        <p>
          <Label bsStyle='info'>{memeber.function}</Label> <Label bsStyle='info'>{memeber.role}</Label>
        </p>
        <If condition={this.props.accept !== undefined && this.props.isAuthorized}>
          <Button bsStyle='primary' bsSize='xsmall' onClick={this.props.accept}>Accept</Button>
        </If>
        <If condition={this.props.refuse !== undefined && this.props.isAuthorized}>
          <Button bsStyle='warning' bsSize='xsmall' onClick={this.props.refuse}>Refuse</Button>
        </If>
        <If condition={this.props.add !== undefined && this.props.isAuthorized}>
          <Button bsStyle='warning' bsSize='xsmall' onClick={this.props.add}>Add</Button>
        </If>
      </div>
    );
  }
}
