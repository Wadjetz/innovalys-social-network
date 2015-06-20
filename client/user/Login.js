import React from 'react/addons'
import Router from 'react-router'
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap'
import validate from "validate.js"
import UserValidator from '../../commun/user-validator'
import UsersActions from './UsersActions'
import UsersStore from './UsersStore'
import UsersApi from './UsersApi'
import If from '../utils/If'
import i18n from '../../commun/local'

export default React.createClass({
  displayName: "Login",
  mixins: [
    React.addons.LinkedStateMixin,
    Router.Navigation
  ],
  render: function() {
    let validator = validate(this.state, UserValidator.loginConstraints);
    let loginError = this.state.loginError;
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <h1>{i18n.__n('login')}</h1>
            <If condition={loginError !== ""}>
              <Alert bsStyle='danger'>
                {loginError}
              </Alert>
            </If>
            <Input
                type='email'
                placeholder={i18n.__n('email')}
                label={i18n.__n('email')}
                ref='email'
                valueLink={this.linkState('email')}
                bsStyle={ (validator && validator.email) ? "error": "success" }
            />
            <Input
                type='password'
                placeholder={i18n.__n('password')}
                label={i18n.__n('password')}
                ref='password'
                valueLink={this.linkState('password')}
            />
            <Button bsStyle='success' onClick={this.submit}>{i18n.__n('login')}</Button>
          </Col>
        </Row>
      </Grid>
    );
  },
  submit: function () {
    // TODO validate data
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    let validator = validate(user, UserValidator.loginConstraints);
    if (validator) {
      console.log(validator);
    } else {
      UsersActions.login(user);
    }
  },
  getInitialState: function() {
    // TODO remove mock
    return {
      email: "root@root.com",
      password: "uYK4UQZ_",
      loginError: UsersStore.getLoginError(),
      validator: validate(this, UserValidator.loginConstraints)
    };
  },
  onChange: function () {
    if(UsersStore.isConnected()) {
      UsersActions.loadMe();
      this.context.router.transitionTo('articles');
    }
    else {
      this.setState({
        loginError: UsersStore.getLoginError(),
      });
    }
  },
  componentDidMount: function () {
    UsersStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    UsersStore.removeChangeListener(this.onChange);
  }
});
