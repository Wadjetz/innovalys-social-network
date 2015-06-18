import React from 'react/addons'
import moment from 'moment'
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap'
import utils from '../../commun/utils'
import If  from '../utils/If'
import UsersActions from './UsersActions'
import UsersStore from './UsersStore'

function getMe() {
  return {
    me: UsersStore.getMe()
  }
}

export default React.createClass({
  displayName: "User",
  render: function() {
    let me = this.state.me;
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>{me.first_name} {me.last_name}</h1>
            <h2>{me.email}</h2>
            <p>{me.description}</p>
          </Col>
        </Row>
      </Grid>
    );
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
