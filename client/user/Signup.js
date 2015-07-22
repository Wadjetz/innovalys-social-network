import React from 'react/addons';
import moment from 'moment';
import _ from 'lodash';
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap';
import utils from '../../commun/utils';
import If from '../utils/If';
import UsersActions from './UsersActions';
import UsersStore from './UsersStore';
import UsersApi from './UsersApi';
import i18n from '../../commun/local';
import UserForm from './UserForm';

export default React.createClass({
  displayName: "Signup",
  mixins: [ React.addons.LinkedStateMixin ],

  render: function() {
    let signupResult = this.state.signupResult;
    let signupError  = this.state.signupError;
    return (
      <Grid>
        <Row className="thumbnail">
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
            <UserForm user={{}} successAction={this.submit} roles={this.state.roles} />
          </Col>
        </Row>
      </Grid>
    );
  },

  getInitialState: function() {
    return {
      signupResult: {
        access: {
          email: "",
          password: ""
        }
      },
      signupError: "",
      roles: []
    };
  },

  submit: function (user) {
    UsersApi.create(user).then(createdUser => {
      this.setState({
        signupResult: createdUser,
        signupError: ""
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.log(err);
      this.setState({
        signupError: JSON.parse(err.responseText)
      });
    });
  },

  componentDidMount: function () {
    UsersApi.roles().then(roles => {
      this.setState({roles});
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      this.setState({
        signupError: err
      });
    });
  }
});
