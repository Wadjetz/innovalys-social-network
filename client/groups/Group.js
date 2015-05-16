import React from 'react/addons'
import moment from 'moment'
import _ from 'lodash'
import Dropzone from 'react-dropzone'
import Router, { Link, Navigation } from 'react-router'
import Bootstrap, {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  TabbedArea,
  TabPane,
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
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab='Messages'>
                {this.state.messages.map(message => {
                  return (
                    <div key={message.id} className="thumbnail">
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
              </TabPane>
              <TabPane eventKey={2} tab='Files'>
                <Dropzone style={dropzoneStyle} onDrop={this.onDrop} size={150} >
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <h1>Files</h1>
                {this.state.files.map(file => {
                  return (
                    <div className="thumbnail" key={file.name + file.id}>
                      <h4>{file.name}</h4>
                      <p>{file.size} Ko</p>
                    </div>
                  );
                })}
              </TabPane>
            </TabbedArea>
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
      newMessage: "",
      files: [],
      file: null
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

    GroupsService.getFiles(slug).then(files => {
      this.setState({
        files: files
      });
    }, err => {
      console.error(err);
    });
  },

  onDrop: function (files) {
    if (files.length > 0) {
      let slug = this.context.router.getCurrentParams().slug;
      GroupsService.uploadFile(slug, files).then(res => {
        this.state.files.push(res[0])
        this.setState({
          files: this.state.files
        });
        console.log(res);
      }, err => {
        console.error(err);
      });
    }
    console.log('Received files: ', files);
  },

  selectFile: function (e) {
    console.log(e);
  },

  join: function () {
    console.log("join");
  }

});

let dropzoneStyle = {
  width: '100%',
  height: 50,
  borderStyle: "dashed",
  marginTop: '10px'
}
