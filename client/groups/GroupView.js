import React from 'react'
import Router, { Link } from 'react-router'
import Bootstrap, { Label, Button } from 'react-bootstrap'
import moment from 'moment'
import markd, { markdown } from 'markdown'
import If from '../utils/If'
import i18n from '../../commun/local'


export default React.createClass({
  render: function() {
    let group = this.props.group;
    let isJoin = this.props.isJoin;
    return (
      <div className="thumbnail">
        <h2><Link to="singleGroup" params={{slug: group.slug}}>{group.name}</Link></h2>
        <Label bsStyle='default'>{group.type}</Label>
        <p>{group.description}</p>
        <If condition={isJoin}>
          <Button onClick={this.join} /*onClick={this.props.handleJoinGroup}*/>{i18n.__n('join')}</Button>
        </If>
      </div>
    );
  }
});
