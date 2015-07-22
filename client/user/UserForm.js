import React from 'react/addons';
import Router, { Navigation } from 'react-router';
import moment from 'moment';
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap';
import utils from'../../commun/utils';
import If from '../utils/If';
import i18n from '../../commun/local';
import UserValidator from '../../commun/user-validator';

export default React.createClass({
  displayName: "UserForm",
  mixins: [React.addons.LinkedStateMixin],

  render: function () {
    let err = this.state.errors;
    let user = this.state.user;
    let rolesView = this.state.roles.map((role, i) => {
      if (user && user.role && user.role === role) {
        return <option selected value={role} key={i}>{role}</option>
      } else {
        return <option value={role} key={i}>{role}</option>
      }
    });
    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12} sm={6}>
              <div className={ (err.first_name) ? 'form-group has-error' : 'form-group'}>
                <label className="control-label" htmlFor="first_name">{ (err.first_name) ? err.first_name : i18n.__n('first_name')}</label>
                <input
                  id="first_name"
                  type="text"
                  ref='first_name'
                  className="form-control"
                  placeholder={i18n.__n('first_name')}
                  valueLink={this.linkState('first_name')} />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className={ (err.last_name) ? 'form-group has-error' : 'form-group'}>
                <label className="control-label" htmlFor="last_name">{ (err.last_name) ? err.last_name : i18n.__n('last_name')}</label>
                <input
                  id="last_name"
                  type="text"
                  ref='last_name'
                  className="form-control"
                  placeholder={i18n.__n('last_name')}
                  valueLink={this.linkState('last_name')} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <div className={ (err.email) ? 'form-group has-error' : 'form-group'}>
                <label className="control-label" htmlFor="email">{ (err.email) ? err.email : i18n.__n('email')}</label>
                <input
                  id="email"
                  type="email"
                  ref='email'
                  className="form-control"
                  placeholder={i18n.__n('email')}
                  valueLink={this.linkState('email')} />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className={ (err.birthday_date) ? 'form-group has-error' : 'form-group'}>
                <label className="control-label" htmlFor="birthday_date">{ (err.birthday_date) ? err.birthday_date : i18n.__n('birthday_date')}</label>
                <input
                  id="birthday_date"
                  type="date"
                  ref='birthday_date'
                  className="form-control"
                  placeholder={i18n.__n('birthday_date')}
                  valueLink={this.linkState('birthday_date')} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <div className={ (err.function) ? 'form-group has-error' : 'form-group'}>
                <label className="control-label" htmlFor="function">{ (err.function) ? err.function : i18n.__n('function')}</label>
                <input
                  id="function"
                  type="text"
                  ref='function'
                  className="form-control"
                  placeholder={i18n.__n('function')}
                  valueLink={this.linkState('function')} />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className={ (err.arrival_date) ? 'form-group has-error' : 'form-group'}>
                <label className="control-label" htmlFor="arrival_date">{ (err.arrival_date) ? err.arrival_date : i18n.__n('arrival_date')}</label>
                <input
                  id="arrival_date"
                  type="date"
                  ref='arrival_date'
                  className="form-control"
                  placeholder={i18n.__n('arrival_date')}
                  valueLink={this.linkState('arrival_date')} />
              </div>
            </Col>
          </Row>
          <Input type='select' label={i18n.__n('roles')} placeholder={i18n.__n('roles')} ref='role' valueLink={this.linkState('role')}>
            {rolesView}
          </Input>
          <div className={ (err.adress) ? 'form-group has-error' : 'form-group'}>
            <label className="control-label" htmlFor="adress">{ (err.adress) ? err.adress : i18n.__n('adress')}</label>
            <input
              id="adress"
              type="text"
              ref='adress'
              className="form-control"
              placeholder={i18n.__n('adress')}
              valueLink={this.linkState('adress')} />
          </div>
          <div className={ (err.description) ? 'form-group has-error' : 'form-group'}>
            <label className="control-label" htmlFor="content">{ (err.description) ? err.description : i18n.__n('description')}</label>
            <textarea
              className="form-control"
              id="content"
              placeholder={i18n.__n('content')}
              ref='description'
              valueLink={this.linkState('description')}
              rows={5} />
          </div>
          <Button bsStyle='success' onClick={this.successAction}>{i18n.__n('save')}</Button>
        </Col>
      </Row>
    );
  },

  successAction: function (e) {
    UserValidator.userValidate({
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      birthday_date: this.state.birthday_date,
      adress: this.state.adress,
      role: this.state.role,
      function: this.state['function'],
      description: this.state.description,
      arrival_date: this.state.arrival_date,
    }).then(user => {
      this.setState({
        errors: {}
      });
      this.props.successAction(user);
    }).fail(err => {
      this.setState({
        errors: err
      });
    });
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      email: props.user.email || "",
      first_name: props.user.first_name || "",
      last_name: props.user.last_name || "",
      birthday_date: moment(this.props.user.birthday_date).format(utils.mysqlDateFormat) || moment().format(utils.mysqlDateFormat),
      adress: props.user.adress || "",
      role: props.user.role || "",
      function: props.user['function'] || "",
      description: props.user.description || "",
      arrival_date: moment(this.props.user.arrival_date).format(utils.mysqlDateFormat) || moment().format(utils.mysqlDateFormat),
      roles: props.roles || []
    });
  },

  getInitialState: function() {
    return {
      email: this.props.user.email || "",
      first_name: this.props.user.first_name || "",
      last_name: this.props.user.last_name || "",
      birthday_date: moment(this.props.user.birthday_date).format(utils.mysqlDateFormat) || moment().format(utils.mysqlDateFormat),
      adress: this.props.user.adress || "",
      role: this.props.user.role || "",
      function: this.props.user['function'] || "",
      description: this.props.user.description || "",
      arrival_date: moment(this.props.user.arrival_date).format(utils.mysqlDateFormat) || moment().format(utils.mysqlDateFormat),
      errors: {},
      roles: [],
      signupResult: {
        access: {
          email: "",
          password: ""
        }
      }
    }
  },

  propTypes: {
    successAction: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
    roles: React.PropTypes.array
  },
});

