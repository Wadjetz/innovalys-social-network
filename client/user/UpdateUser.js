import React from 'react/addons';
import Router, { Navigation } from 'react-router';
import moment from 'moment';
import _ from 'lodash';
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap';
import utils from'../../commun/utils';
import If from '../utils/If';
import i18n from '../../commun/local';
import UsersApi from './UsersApi';
import UserForm from './UserForm';

export default React.createClass({
  displayName: "UpdateUser",
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation
  ],

  render: function() {
    return (
      <Grid>
        <Row className="thumbnail">
          <Col xs={12}>
            <h1>{i18n.__n('update_user')}</h1>
            <If condition={this.state.createUserError}>
              <Alert bsStyle='danger'>
                {i18n.__n('error')}
              </Alert>
            </If>
            <If condition={this.state.createUserSuccess}>
              <Alert bsStyle='success'>
                {i18n.__n('success')}
              </Alert>
            </If>
            <UserForm user={this.state.user} successAction={this.update} roles={this.state.roles} />
          </Col>
        </Row>
      </Grid>
    );
  },

  update: function (user) {
    let id = this.state.user.id;
    UsersApi.update(id, user).then(result => {
      user.id = this.state.user.id;
      console.debug("UpdateUser update", result);
      this.setState({
        user: user,
        createUserError: false,
        createUserSuccess: true
      });
    }).fail(function (err) {
      this.setState({
        createUserError: true,
        createUserSuccess: false
      });
    });
  },

  getInitialState: function() {
    return {
      user: {},
      roles: [],
      createUserError: false,
      createUserSuccess: false
    };
  },

  componentWillMount: function () {
    let id = this.context.router.getCurrentParams().id;
    UsersApi.getOneById(id).then(user => {
      this.setState({
        user: user
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.log(err);
    });

    UsersApi.roles().then(roles => {
      this.setState({
        roles: roles
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      else console.log(err);
    });
  },

  contextTypes: {
    router: React.PropTypes.func
  },
});