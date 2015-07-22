import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap';
import ArticlesService from '../articles/ArticlesService';
import AppActions from '../app/AppActions';
import UsersService from '../user/UsersApi';
import i18n from '../../commun/local';

export default class AdminUsers extends React.Component {
  /**
   * Call UsersService for find All users
   * @param  {object} props Props
   */
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    UsersService.getAll().then(users => {
      this.setState({
        users: users
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
    });
  }

  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    let users = this.state.users;
    let usersView = users.map(user => {
      return (
        <Panel key={user.id}>
          <h2>
            <Link to="profil" params={{id: user.id}}>{user.first_name} {user.last_name}</Link>
          </h2>
          <p>
            <Link className="btn btn-xs btn-primary" to="updateUser" params={{id: user.id}}>{i18n.__n('update')}</Link>
            <Button bsSize='xsmall' bsStyle='danger' onClick={this.deleteUser(user)}>{i18n.__n('delete')}</Button>
          </p>
        </Panel>
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
  }

  /**
   * Delete news Handler
   * @param  {object} user User object
   * @return {Function}      Event handler with user closure
   */
  deleteUser(user) {
    return function (e) {
      UsersService.delete(user.id).then(result => {
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
  }
}
