import React from 'react/addons';
import { Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col, ListGroup, ListGroupItem, Button, Input } from 'react-bootstrap';
import GroupsService from './GroupsService';
import i18n from '../../commun/local';

export default React.createClass({
  displayName: "GroupMessageForm",
  mixins: [React.addons.LinkedStateMixin, Navigation],

  render: function () {
    return (
      <div>
        GroupMessageForm
      </div>
    );
  }
});