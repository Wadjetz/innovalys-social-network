import React from 'react/addons';
import Router, { Link, Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col, ListGroup, ListGroupItem, Button, Input, Panel, Label } from 'react-bootstrap';
import ArticlesService from '../articles/ArticlesService';
import AppActions from '../app/AppActions';
import UsersApi from '../user/UsersApi';
import i18n from '../../commun/local';

export default React.createClass({
  displayName: "AdminUsers",
  render: function () {
    let users = this.state.users;
    console.log(users);
    let usersView = users.map(user => {
      return (
        <div key={user.id}>
          <h2>{user.first_name} {user.last_name}</h2>
        </div>
      );
    });
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            {usersView}
          </Col>
        </Row>
      </Grid>
    );
  },

  deleteUser: function (user) {
    return function (e) {
      console.log(user);
    }.bind(this);
  },

  getInitialState: function () {
    return {
      users: []
    };
  },

  componentDidMount: function () {
    UsersApi.getAll().then(users => {
      console.log(users);
      this.setState({
        users: users
      });
    }, err => {
      if (err.status === 401) { AppActions.unauthorized(); }
    });
  }

});
