import React from 'react/addons';
import Bootstrap, { Grid, Row, Col, Input, Label, Button } from 'react-bootstrap';
import i18n from '../../commun/local';
import UsersApi from '../user/UsersApi';
import UsersStore from '../user/UsersStore';
import Router, { Link, Navigation } from 'react-router';

export default React.createClass({
  displayName: "Profil",
  mixins: [React.addons.LinkedStateMixin, Navigation],
  render: function () {
    var profil = this.state.profil;
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <h2>{profil.first_name} {profil.last_name}</h2>
            <p>{profil.description}</p>
          </Col>
        </Row>
      </Grid>
    );
  },

  getInitialState: function () {
    return {
      profil: {
        "email":"",
        "role":"",
        "first_name":"",
        "last_name":"",
        "birthday_date":"",
        "status_profile":"",
        "status_connection":"",
        "function":"",
        "description":"",
        "arrival_date":"",
        "last_connection":""
      }
    };
  },

  componentDidMount: function () {
    let id = this.context.router.getCurrentParams().id;
    UsersApi.getProfil(id).then(profil => {
      this.setState({
        profil: profil
      });
    }).fail(function (err) {
      console.log(err);
    });
  }

});
