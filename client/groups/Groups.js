import React from 'react'
import Router, { Link, Navigation } from 'react-router'
import Bootstrap, {
  Grid,
  Row,
  Col,
  TabbedArea,
  TabPane,
  Alert,
  Input,
  Button
} from 'react-bootstrap'

import Chat from '../chat/Chat'
import GroupsService from './GroupsService'
import GroupView from './GroupView'
import If from '../utils/If'

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation
  ],

  render: function () {
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab='My Groups'>
                {this.state.myGroups.map(group => {
                  return ( <GroupView key={group.id} group={group} /> );
                })}
              </TabPane>
              <TabPane eventKey={2} tab='Groups'>
                {this.state.groups.map(group => {
                  return ( <GroupView key={group.id} group={group} /> );
                })}
              </TabPane>
              <TabPane eventKey={3} tab='Create Group'>
                  <If condition={true}>
                      <Alert bsStyle='danger'>
                      </Alert>
                  </If>
                  <If condition={true}>
                      <Alert bsStyle='success'>
                      </Alert>
                  </If>
                  <Input
                      type='text'
                      placeholder='Name'
                      label='Name'
                      ref='name'
                      valueLink={this.linkState('name')}
                  />
                  <Input
                      type='textarea'
                      rows={4}
                      label='Description'
                      ref='description'
                      valueLink={this.linkState('description')}
                  />
                  <Button bsStyle='success' onClick={this.createGroup}>Save</Button>
              </TabPane>
            </TabbedArea>
          </Col>
          <Col xs={4}>
              <Chat />
          </Col>
        </Row>
      </Grid>
    );
  },

  getInitialState: function () {
    return {
      groups: [],
      myGroups: []
    };
  },

  componentDidMount: function () {
    GroupsService.getAll().then(groups => {
      this.setState({
        groups: groups
      });
    }, err => {
      console.error(err);
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });

    GroupsService.getMyGroups().then(groups => {
      this.setState({
        myGroups: groups
      })
    }, err => {
      console.error(err);
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });
  },

  createGroup: function () {
    console.log("createGroup");
  }

});
