import React from 'react';
import Router, { Link } from 'react-router';
import Bootstrap, { Label, Button } from 'react-bootstrap';
import moment from 'moment';
import markd, { markdown } from 'markdown';
import If from '../utils/If';
import i18n from '../../commun/local';

/**
 * Group components
 */
export default class GroupView extends React.Component {
  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    let group = this.props.group;
    let isJoin = this.props.isJoin;
    return (
      <div className="thumbnail">
        <If condition={isJoin === true}>
          <h2>{group.name}</h2>
        </If>
        <If condition={isJoin === false}>
          <h2><Link to="singleGroup" params={{slug: group.slug}}>{group.name}</Link></h2>
        </If>
        <Label bsStyle='default'>{group.type}</Label>
        <p>{group.description}</p>
        <If condition={isJoin}>
          <Button bsStyle='success' onClick={this.join}>{i18n.__n('join')}</Button>
        </If>
      </div>
    );
  }
}
