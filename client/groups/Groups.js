import React from 'react'
import Router, { Link, Navigation } from 'react-router'
import _ from 'lodash'
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
              <TabPane eventKey={1} tab='My Groups'>
                {myGroupsView}
              </TabPane>
              <TabPane eventKey={2} tab='Groups'>
                {groupsView}
              </TabPane>
              <TabPane eventKey={3} tab='Create Group'>
                  <If condition={this.state.createGroupError}>
                      <Alert bsStyle='danger'>
                        Error
                      </Alert>
                  </If>
                  <If condition={this.state.createGroupSuccess}>
                      <Alert bsStyle='success'>
                        Success
                      </Alert>
                  </If>
                  <Input
                      type='text'
                      placeholder='Name'
                      label='Name'
                      ref='name'
                      valueLink={this.linkState('name')}
                  />
                  <Input type='select' label='Accesses' placeholder='Accesses' valueLink={this.linkState('access')}>
                    {this.state.accesses.map((access, i) => {
                      return (
                        <option value={access} key={access + i}>{access}</option>
                      );
                    })}
                  </Input>
                  <Input type='select' label='Types' placeholder='types' valueLink={this.linkState('type')}>
                    {this.state.types.map((type, i) => {
                      return (
                        <option value={type} key={type + i}>{type}</option>
                      );
                    })}
                  </Input>
                  <Input
                      type='textarea'
                      rows={4}
                      label='Description'
                      ref='description'
                      valueLink={this.linkState('description')}
                  />
                  <Button bsStyle='primary' onClick={this.createGroup}>Save</Button>
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
      myGroups: [],
      description: "",
      name: "",
      accesses: [],
      access: "private",
      types: [],
      type: "project",
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
      console.error(err);
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });

    GroupsService.getMyGroups().then(groups => {
      this.setState({
        myGroups: groups
      });
    }, err => {
      console.error(err);
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });

    GroupsService.getGroupsTypes().then(types => {
      this.setState({
        accesses: types.accesses,
        types: types.types
      })
    }, err => {
      console.error(err);
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });
  },

  createGroup: function () {
    // TODO validate data
    var newGroup = {
      name: this.state.name,
      description: this.state.description,
      access: this.state.access,
      type: this.state.type
    };

    GroupsService.create(newGroup).then(result => {
      this.state.groups.push(result);
      this.setState({
        createGroupSuccess: true,
        createGroupError: false,
        groups: this.state.groups,
        name: "",
        description: ""
      });

      window.setTimeout(() => {
        this.setState({
          createGroupSuccess: false,
          createGroupError: false,
        });
      }, 5000);
    }, err => {
      console.error(err);
      this.setState({
        createGroupSuccess: false,
        createGroupError: true
      });
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });
  },

  handleJoinGroup: function (group) {
    return function () {
      GroupsService.join(group).then(res => {
        console.log(res);
        let groups = _.filter(this.state.groups, g => g.id != group.id);
        console.log(groups);
        this.setState({
          groups: groups
        });
      }, err => {
        console.log(err);
      });
    }
  }

});
