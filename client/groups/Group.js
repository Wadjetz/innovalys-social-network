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
            {this.state.messages.map(message => {
              return (
                <div className="thumbnail">
                  <h2>by {message.first_name} {message.last_name}</h2>
                  <p>{message.content}</p>
                </div>
              );
            })}
            <h4>Create new message</h4>
              <Input
                  type='textarea'
                  placeholder='Content'
                  label='Content'
                  ref='content'
                  valueLink={this.linkState('newMessage')}
              />
            <Button bsStyle='success' onClick={this.createMessage}>Save</Button>
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

  createMessage: function () {
    let slug = this.context.router.getCurrentParams().slug;
    console.log("createMessage", this.state.newMessage);
    if (this.state.newMessage !== "") {
      GroupsService.createMessageGroup(slug, this.state.newMessage).then(result => {
        console.log(result);
        this.state.messages.push(result);
        this.setState({
          messages: this.state.messages,
          newMessage: ""
        })
      }, err => {
        console.error(err);
      });
    } else {
      console.error("createMessage error");
    }
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
      members: [],
      messages: [],
      newMessage: ""
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

    GroupsService.getMessagesGroups(slug).then(messages => {
      this.setState({
        messages: messages
      });
    }, err => {
      console.error(err);
    });
  },

  join: function () {
    console.log("join");
  }

});
