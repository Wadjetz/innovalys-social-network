import React from 'react/addons';
import Bootstrap, { Grid, Row, Col, Input, Label, Button } from 'react-bootstrap';
import i18n from '../../commun/local';
import UsersApi from '../user/UsersApi';
import UsersStore from '../user/UsersStore';
import Router, { Link, Navigation } from 'react-router';
import Users from '../user/Users';
import moment from 'moment';

export default React.createClass({
  displayName: "Profil",
  mixins: [React.addons.LinkedStateMixin, Navigation],
  render: function () {
    var profil = this.state.profil;
    console.log(profil);
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>{i18n.__n('profile')}</h1>
            <div className="panel panel-default">
              <div className="panel-body">
                <h2><i style={{fontSize: '1em'}} className="mdi-action-account-box"></i> {profil.first_name} {profil.last_name}</h2>
                <p>
                  <span className="label label-primary">{profil.role}</span>
                  <span className="label label-success">{profil.function}</span>
                </p>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">{i18n.__n('description')}</div>
              <div className="panel-body">
                {profil.description}
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-heading">{i18n.__n('birthday_date')}</div>
              <div className="panel-body">
                {moment(profil.birthday_date).format("DD MMMM YYYY")}
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-heading">{i18n.__n('email')}</div>
              <div className="panel-body">
                {profil.email}
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-heading">{i18n.__n('arrival_date')}</div>
              <div className="panel-body">
                {moment(profil.arrival_date).format("DD MMMM YYYY")}
              </div>
            </div>

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
