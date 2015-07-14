import React from 'react/addons';
import moment from 'moment';
import _ from 'lodash';
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap';
import utils from '../../commun/utils';
import If  from '../utils/If';
import UsersActions from './UsersActions';
import UsersStore from './UsersStore';
import UsersApi from './UsersApi';
import i18n from '../../commun/local';

function getMe() {
  return {
    me: UsersStore.getMe(),
    currentPassword: "",
    newPassword: "",
    changePasswordError: "",
    changePasswordSuccess: ""
  };
}

export default React.createClass({
  displayName: "User",
  mixins: [ React.addons.LinkedStateMixin ],

  render: function() {
    let me = this.state.me;
    let changePasswordError = this.state.changePasswordError;
    let changePasswordSuccess = this.state.changePasswordSuccess;

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>{me.first_name} {me.last_name}</h1>
            <h2>{me.email}</h2>
            <p>{me.description}</p>
          </Col>
          <Col xs={12}>
            <h1>{i18n.__n('change_password')}</h1>
            <If condition={!_.isEmpty(changePasswordError)}>
              <Alert bsStyle='danger'>
                {changePasswordError}
              </Alert>
            </If>
            <If condition={!_.isEmpty(changePasswordSuccess)}>
              <Alert bsStyle='success'>
                {changePasswordSuccess}
              </Alert>
            </If>
            <Input
              type='password'
              placeholder={i18n.__n('current_password')}
              label={i18n.__n('current_password')}
              ref='currentPassword'
              valueLink={this.linkState('currentPassword')}
            />
            <Input
              type='password'
              placeholder={i18n.__n('new_password')}
              label={i18n.__n('new_password')}
              ref='newPassword'
              valueLink={this.linkState('newPassword')}
            />
            <Button
              bsStyle='success'
              disabled={(this.state.currentPassword === "") || (this.state.newPassword === "")}
              onClick={this.submit}>
              {i18n.__n('save')}
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  },
  submit: function () {
    if (this.state.currentPassword !== "" && this.state.newPassword != "") {
      console.log(this.state.currentPassword, this.state.newPassword);
      UsersApi
        .changePassword(this.state.currentPassword, this.state.newPassword)
        .then(res => {
          console.log(res);
          this.setState({
            changePasswordError: "",
            changePasswordSuccess: i18n.__n('success')
          });
        })
        .fail(err => {
          let jsonError = JSON.parse(err.responseText);
          console.error(jsonError);
          this.setState({
            changePasswordError: jsonError.error,
            changePasswordSuccess: ""
          });
        })
    } else {
      console.error("error");
    }
  },
  getInitialState: function () {
    return getMe();
  },
  onChange: function () {
    this.setState(getMe());
  },
  componentDidMount: function () {
    UsersStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    UsersStore.removeChangeListener(this.onChange);
  }
});
