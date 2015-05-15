import React from 'react/addons'
import moment from 'moment'
import Router, { Link, Navigation } from 'react-router'
import Bootstrap, {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Input,
  Label
} from 'react-bootstrap'

import GroupsService from './GroupsService'
import Chat from '../chat/Chat'

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin, Navigation],

  render: function() {
    console.log("Group.render", this.state);
    let membersView = this.state.members.map((memeber, i) => (<div key={i}>{memeber.first_name}</div>));
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <h1>Messages</h1>
          </Col>
          <Col xs={4}>
            <h1>{this.state.group.name}</h1>
            <Label bsStyle='default'>{this.state.group.type}</Label>
            <p>{this.state.group.description}</p>
            <Button onClick={this.join}>Join</Button>
            <Chat />
            <h2>Members</h2>
            {membersView}
          </Col>
        </Row>
      </Grid>
    );
  },

  getInitialState: function () {
    return {
      group: {
        id: 0,
        slug: "",
        name: "",
        description: "",
        created: "",
        updated: "",
        status: "",
        access: "",
        type: "",
        users_id: "",
      },
      members: []
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function () {
    let slug = this.context.router.getCurrentParams().slug;
    GroupsService.get(slug).then(group => {
      console.log(group);
      this.setState(group);
    }, err => {
      console.error(err);
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });
  },

  join: function () {
    console.log("join");
  }

});
