import React from 'react/addons'
import moment from 'moment'
import _ from 'lodash'
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap'
import utils from '../../commun/utils'
import If from '../utils/If'
import UsersActions from './UsersActions'
import UsersStore from './UsersStore'
import UsersApi from './UsersApi'
import i18n from '../../commun/local'

export default React.createClass({
  displayName: "Signup",
  mixins: [ React.addons.LinkedStateMixin ],
  render: function() {
    // TODO add validators
    let rolesView = this.state.roles.map((role, i) => (<option value={role} key={i}>{role}</option>));
    let signupResult = this.state.signupResult;
    let signupError  = this.state.signupError;
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>{i18n.__n('create_user')}</h1>
            <If condition={!_.isEmpty(signupError)}>
              <Alert bsStyle='danger'>
                {signupError}
              </Alert>
            </If>
            <If condition={signupResult.access.email !== ""}>
              <Alert bsStyle='success'>
                {signupResult.access.email} : {signupResult.access.password}
              </Alert>
            </If>
            <Row>
              <Col xs={12} sm={6}>
                <Input
                  type='text'
                  placeholder={i18n.__n('first_name')}
                  label={i18n.__n('first_name')}
                  ref='first_name'
                  valueLink={this.linkState('first_name')}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Input
                  type='text'
                  placeholder={i18n.__n('last_name')}
                  label={i18n.__n('last_name')}
                  ref='last_name'
                  valueLink={this.linkState('last_name')}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Input
                  type='email'
                  placeholder={i18n.__n('email')}
                  label={i18n.__n('email')}
                  ref='email'
                  valueLink={this.linkState('email')}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Input
                  type='date'
                  ref='birthday_date'
                  label={i18n.__n('birthday_date')}
                  valueLink={this.linkState('birthday_date')}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Input
                  type='text'
                  placeholder={i18n.__n('function')}
                  label={i18n.__n('function')}
                  ref='function'
                  valueLink={this.linkState('function')}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Input
                  type='date'
                  ref='arrival_date'
                  label={i18n.__n('arrival_date')}
                  valueLink={this.linkState('arrival_date')}
                />
              </Col>
            </Row>
            <Input type='select' label={i18n.__n('roles')} placeholder={i18n.__n('roles')} ref='role' valueLink={this.linkState('role')}>
              {rolesView}
            </Input>
            <Input
              type='text'
              placeholder={i18n.__n('adress')}
              label={i18n.__n('adress')}
              ref='adress'
              valueLink={this.linkState('adress')}
            />
            <Input
              type='textarea'
              placeholder={i18n.__n('description')}
              label={i18n.__n('description')}
              ref='description'
              valueLink={this.linkState('description')}
            />
            <Button bsStyle='success' onClick={this.submit}>{i18n.__n('save')}</Button>
          </Col>
        </Row>
      </Grid>
    );
  },
  getInitialState: function() {
    // TODO remove data mock
    return {
      email: "user-" + (Math.floor(Math.random() * 100000) + 1) + "@domain.com",
      first_name: "First Name",
      last_name: "Last Name",
      birthday_date: moment().format(utils.mysqlDateFormat),
      adress: "rue bidon",
      role: "user",
      function: "peon",
      description: "descr",
      arrival_date: moment().format(utils.mysqlDateFormat),
      roles: [],
      signupResult: {
        access: {
          email: "",
          password: ""
        }
      },
      signupError: ""
    };
  },
  submit: function () {
    // TODO validate data
    let newUser = {
      email: this.state.email,
      birthday_date: this.state.birthday_date,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      adress: this.state.adress,
      function: this.state.function,
      description: this.state.description,
      arrival_date: this.state.arrival_date,
      role: this.state.role
    };
    console.log(newUser);
    UsersApi.create(newUser)
      .then(createdUser => {
        this.setState({
          signupResult: createdUser
        });
      })
      .fail(err => {
        if (err.status === 401) { AppActions.unauthorized(); }
        console.log(err);
        this.setState({
          signupError: err
        });
      });
  },
  componentDidMount: function () {
    UsersApi.roles()
      .then(roles => {
        this.setState({roles});
      })
      .fail(err => {
        if (err.status === 401) { AppActions.unauthorized(); }
        this.setState({
          signupError: err
        });
      });
  }
});
