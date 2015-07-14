import React from 'react';
import Router, { Link, Navigation } from 'react-router';
import _ from 'lodash';
import Bootstrap, { Grid, Row, Col, TabbedArea, TabPane, Alert, Input, Button } from 'react-bootstrap';
import GroupsService from './GroupsService';
import GroupView from './GroupView';
import If from '../utils/If';
import i18n from '../../commun/local';
import Users from '../user/Users';
import GroupForm from './GroupForm';

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation
  ],

  render: function () {
    let myGroupsView = this.state.myGroups.map(group =>
      <GroupView key={group.id} group={group} isJoin={false} />
    );

    let groupsView = this.state.groups.map(group =>
      <GroupView key={group.id} group={group} isJoin={true} handleJoinGroup={this.handleJoinGroup(group)} />
    );

    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab={i18n.__n('my_groups')}>
                {myGroupsView}
              </TabPane>
              <TabPane eventKey={2} tab={i18n.__n('groups')}>
                {groupsView}
              </TabPane>
              <TabPane eventKey={3} tab={i18n.__n('create_groups')}>
                  <If condition={this.state.createGroupError}>
                      <Alert bsStyle='danger'>
                        {i18n.__n('error')}
                      </Alert>
                  </If>
                  <If condition={this.state.createGroupSuccess}>
                      <Alert bsStyle='success'>
                        {i18n.__n('success')}
                      </Alert>
                  </If>
                  <GroupForm group={{}} successAction={this.createGroup} />
              </TabPane>
            </TabbedArea>
          </Col>
          <Col xs={4}>
            <Users />
          </Col>
        </Row>
      </Grid>
    );
  },

  getInitialState: function () {
    return {
      groups: [],
      myGroups: [],
      createGroupError: false,
      createGroupSuccess: false
    };
  },

  componentDidMount: function () {
    GroupsService.getAll().then(groups => {
      this.setState({
        groups: groups
      });
    }, err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });

    GroupsService.getMyGroups().then(groups => {
      this.setState({
        myGroups: groups
      });
    }, err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });
  },

  createGroup: function (newGroup) {
    console.log("createGroup", newGroup);
    GroupsService.create(newGroup).then(result => {
      this.state.myGroups.push(result);
      this.setState({
        createGroupSuccess: true,
        createGroupError: false,
        myGroups: this.state.myGroups,
      });

      window.setTimeout(() => {
        this.setState({
          createGroupSuccess: false,
          createGroupError: false,
        });
      }, 5000);
    }, err => {
      this.setState({
        createGroupSuccess: false,
        createGroupError: true
      });
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });
  },

  handleJoinGroup: function (group) {
    return function () {
      console.log("handleJoinGroup", group);
      GroupsService
        .join(group)
        .then(res => {
          let groups = _.filter(this.state.groups, function (g) {
            return g.id !== group.id
          });
          this.state.myGroups.push(group);
          this.setState({
            groups: groups,
            myGroups: this.state.myGroups
          });
        })
        .fail(err => {
          console.error(err);
        });
    }.bind(this);
  }

});
