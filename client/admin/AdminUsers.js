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
    let usersView = users.map(user => {
      return (
        <div key={user.id}>
          <h2>{user.first_name} {user.last_name}</h2>
          <p>
            <Link className="btn btn-default" to="updateUser" params={{id: user.id}}>{i18n.__n('update')}</Link>
            <Button bsStyle='danger' onClick={this.deleteUser(user)}>{i18n.__n('delete')}</Button>
          </p>
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
      UsersApi.delete(user.id).then(result => {
        if(result.delete > 0) {
          let users = this.state.users.filter(u => u.id !== user.id);
          this.setState({
            users: users
          });
        } else {
          console.log(result);
        }
      }).fail(err => {
        console.log(err);
      });
    }.bind(this);
  },

  getInitialState: function () {
    return {
      users: []
    };
  },

  componentDidMount: function () {
    UsersApi.getAll().then(users => {
      this.setState({
        users: users
      });
    }, err => {
      if (err.status === 401) { AppActions.unauthorized(); }
    });
  }

});
