import React from 'react/addons';
import moment from 'moment';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import Router, { Link, Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col, ListGroup, ListGroupItem, TabbedArea, TabPane, Button, Input, Label } from 'react-bootstrap';
import GroupsService from './GroupsService';
import UsersStore from '../user/UsersStore';
import MessageGroup from './MessageGroup';
import FileGroup from './FileGroup';
import Member from './Member';
import If from '../utils/If';
import i18n from '../../commun/local';

function getMe() {
  return {
    me: UsersStore.getMe(),
    connected: UsersStore.isConnected()
  };
}

function isAuthorized(me, group) {
  let r = (me.role === 'admin') || (me.role === 'chef') || (me.id === group.id);
  console.log("r=", r);
  return r;
}

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
      <Member memeber={memeber} group={this.state.group} key={memeber.id} />
    );

    let newMembersView = this.state.newMembers.map(memeber =>
      <Member memeber={memeber} group={this.state.group} key={memeber.id} />
    );

    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab='Messages'>
                {messagesView}
                <h4>{i18n.__n('create_message')}</h4>
                  <Input
                      type='textarea'
                      placeholder='Content'
                      label='Content'
                      ref='content'
                      valueLink={this.linkState('newMessage')}
                  />
                <Button bsStyle='success' onClick={this.createMessage}>{i18n.__n('save')}</Button>
              </TabPane>
              <TabPane eventKey={2} tab='Files'>
                <Dropzone style={dropzoneStyle} onDrop={this.onDrop} size={150} >
                  <div>{i18n.__n('dropzone')}</div>
                </Dropzone>
                <h1>{i18n.__n('file')}</h1>
                {filesView}
              </TabPane>
              <TabPane eventKey={3} tab='Members'>
                <If condition={isAuthorized(this.state.me.me, this.state.group) === true}>
                  <div>
                    <h1>News Members</h1>
                    {newMembersView}
                  </div>
                </If>
                <h2>{i18n.__n('members')}</h2>
                {membersView}
              </TabPane>
            </TabbedArea>
          </Col>
          <Col xs={4}>
            <h1>{this.state.group.name}</h1>
            <Label bsStyle='default'>{this.state.group.type}</Label>
            <p>{this.state.group.description}</p>
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
      newMembers: [],
      messages: [],
      newMessage: "",
      files: [],
      file: null,
      me: getMe()
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount: function () {
    let slug = this.context.router.getCurrentParams().slug;
    GroupsService.getBySlug(slug).then(group => {
      this.setState({
        group: group
      });
    }, err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });

    GroupsService.getMessagesGroups(slug).then(messages => {
      this.setState({
        messages: messages
      });
    }, err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });

    GroupsService.getFiles(slug).then(files => {
      this.setState({
        files: files
      });
    }, err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });

    GroupsService.getMembers(slug).then(members => {
      this.setState({
        members: members
      });
    }).fail(err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });

    GroupsService.getPendingMembers(slug).then(newMembers => {
      this.setState({
        newMembers: newMembers
      });
    }).fail(err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
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

  onChange: function () {
    this.setState({
      me: getMe()
    });
  },

  componentDidMount: function () {
    UsersStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    UsersStore.removeChangeListener(this.onChange);
  },

});

let dropzoneStyle = {
  width: '100%',
  height: 50,
  borderStyle: "dashed",
  marginTop: '10px'
}
