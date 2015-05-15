import React from 'react'
import Router, { Link } from 'react-router'
import Bootstrap, { Label, Button } from 'react-bootstrap'
import moment from 'moment'
import markd, { markdown } from 'markdown'

export default React.createClass({
  render: function() {
    let group = this.props.group;
    return (
      <div className="thumbnail">
        <h2><Link to="singleGroup" params={{slug: group.slug}}>{group.name}</Link></h2>
        <Label bsStyle='default'>{group.type}</Label>
        <p>{group.description}</p>
      </div>
    );
  }
});
