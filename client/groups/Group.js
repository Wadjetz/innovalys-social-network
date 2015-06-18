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
import MessageGroup from './MessageGroup'
import FileGroup from './FileGroup'
import Member from './Member'

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin, Navigation],

  render: function() {

    let messagesView = this.state.messages.map(message =>
      <MessageGroup message={message} key={message.id} />
    );

    let filesView = this.state.files.map(file =>
      <FileGroup file={file} key={file.name + file.id}  />
    );

    let membersView = this.state.members.map(memeber =>
      <Member memeber={memeber} key={memeber.id} />
    );

    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab='Messages'>
                {messagesView}
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
                {filesView}
              </TabPane>
            </TabbedArea>
          </Col>
          <Col xs={4}>
            <h1>{this.state.group.name}</h1>
            <Label bsStyle='default'>{this.state.group.type}</Label>
            <p>{this.state.group.description}</p>
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
    if (this.state.newMessage !== "") {
      GroupsService.createMessageGroup(slug, this.state.newMessage).then(result => {
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
    GroupsService.getBySlug(slug).then(group => {
      this.setState({
        group: group
      });
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
        this.state.files.push(res)
        console.log(res);
        this.setState({
          files: this.state.files
        });
      }, err => {
        console.error(err);
      });
    }
    console.log('Received files: ', files);
  },

  selectFile: function (e) {
    console.log(e);
  },

});

let dropzoneStyle = {
  width: '100%',
  height: 50,
  borderStyle: "dashed",
  marginTop: '10px'
}
