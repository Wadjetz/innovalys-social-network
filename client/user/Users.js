import React from 'react/addons'
import moment from 'moment'
import _ from 'lodash'
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap'
import utils from '../../commun/utils'
import If  from '../utils/If'
import UsersActions from './UsersActions'
import UsersStore from './UsersStore'
import i18n from '../../commun/local'
import User from './User'

function getData() {
  return UsersStore.getData();
}

export default React.createClass({
  displayName: "Users",

  render: function() {
    let usersView = this.state.users.map(user => <User user={user} key={user.id} />)
    return (
      <Row>
        <Col xs={12}>
          <h2>Users</h2>
          <div>
            {usersView}
          </div>
        </Col>
      </Row>
    );
  },

  getInitialState: function() {
    return getData();
  },

  onChange: function () {
    this.setState(UsersStore.getData());
  },

  componentDidMount: function () {
    UsersActions.loadUsers();
    UsersStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    UsersStore.removeChangeListener(this.onChange);
  }

});
