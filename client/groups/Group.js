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
import GroupForm from './GroupForm';
import GroupMessageForm from './GroupMessageForm';
import GroupActions from './GroupActions';
import GroupStore from './GroupStore';

function getData() {
  return GroupStore.getGroupData();
}

function getMe() {
  return {
    me: UsersStore.getMe(),
    connected: UsersStore.isConnected()
  };
}

function isAuthorized(me, group) {
  return (me.role === 'admin') || (me.role === 'chef') || (me.id === group.id);
}

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin, Navigation],

  render: function() {
    let slug = this.context.router.getCurrentParams().slug;
    //console.log("Group render", this.state);
    let messagesView = this.state.messages.map(message => {
      if (this.state.wantToUpdateMessage === message.id) {
        return (
          <GroupMessageForm key={message.id} groupMessage={message} successAction={this.updateMessage} />
        );
      } else {
        return (
          <MessageGroup
            message={message}
            key={message.id}
            me={this.state.me}
            deleteAction={this.deleteMessageGroup}
            updateAction={this.wantToUpdateMessageToggle(message)} />
        );
      }
    });

    let filesView = this.state.files.map(file =>
      <FileGroup file={file} key={file.name + file.id} slug={slug} me={this.state.me.me}  />
    );

    let membersView = this.state.members.map(memeber => {
      if (this.state.me.me.id === memeber.id) {
        return null;
      } else {
        return (
          <Member
            memeber={memeber}
            group={this.state.group}
            key={memeber.id}
            isAccepted={true}
            refuse={this.refuse(this.state.group, memeber)} />
        );
      }
    });

    let newMembersView = this.state.newMembers.map(memeber =>
      <Member
        memeber={memeber}
        group={this.state.group}
        key={memeber.id}
        accept={this.accept(this.state.group, memeber)}
        refuse={this.refuse(this.state.group, memeber)}
        isAccepted={false} />
    );

    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab='Messages'>
                {messagesView}
                <h4>{i18n.__n('create_message')}</h4>
                <GroupMessageForm groupMessage={{}} successAction={this.createMessage} />
              </TabPane>
              <TabPane eventKey={2} tab='Files'>
                <Dropzone style={dropzoneStyle} onDrop={this.onDrop} size={150} >
                  <div>{i18n.__n('dropzone')}</div>
                </Dropzone>
                <h1>{i18n.__n('file')}</h1>
                {filesView}
              </TabPane>
              <TabPane eventKey={3} tab='Members'>
                <If condition={(isAuthorized(this.state.me.me, this.state.group) === true) && this.state.newMembers.length > 0}>
                  <div>
                    <h1>News Members</h1>
                    {newMembersView}
                  </div>
                </If>
                <h2>{i18n.__n('members')}</h2>
                {membersView}
              </TabPane>
              <TabPane eventKey={4} tab='Parametres'>
                <If condition={isAuthorized(this.state.me.me, this.state.group)}>
                  <div>
                    <h2>Update group</h2>
                    <GroupForm group={this.state.group} successAction={this.updateGroup}/>
                    <h1>Add members</h1>
                    <h1>Delete group</h1>
                    <Button onClick={this.delete} bsStyle='danger'>{i18n.__n('delete')}</Button>
                  </div>
                </If>
              </TabPane>
            </TabbedArea>
          </Col>
          <Col xs={4}>
            <h1>{this.state.group.name}</h1>
            <p>
              <Label bsStyle='default'>{this.state.group.type}</Label>
              <Label bsStyle='default'>{this.state.group.access}</Label>
              <Label bsStyle='default'>{this.state.group.status}</Label>
            </p>
            <p>{this.state.group.description}</p>
            <p>
              <Label bsStyle='default'>by {this.state.group.users_first_name} {this.state.group.users_last_name}</Label>
              <Label bsStyle='default'>{this.state.group.users_function}</Label>
              <Label bsStyle='default'>{this.state.group.users_role}</Label>
            </p>
          </Col>
        </Row>
      </Grid>
    );
  },

  delete: function () {
    let slug = this.context.router.getCurrentParams().slug;
    GroupsService.delete(slug).then(result => {
      console.log("delete group result=", result);
      this.context.router.transitionTo('groups');
    }).fail(err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
      console.log(err);
    });
  },

  createMessage: function (newMessage) {
    console.log("createMessage", newMessage);
    let slug = this.context.router.getCurrentParams().slug;
    GroupActions.createGroupMessage(slug, newMessage.content);
  },

  updateMessage: function (newMessage, groupMessage) {
    groupMessage.content = newMessage.content;
    console.log("updateMessage", newMessage.content, groupMessage);
    GroupsService.updateMessageGroup(groupMessage).then(result => {
      console.debug("updateMessage result", result);
      this.setState({
        wantToUpdateMessage: ""
      });
    }).fail(err => {
      console.debug("updateMessage error", err);
    });
  },

  wantToUpdateMessageToggle: function (message) {
    return function (e) {
      console.log("wantToUpdateMessageToggle", message);
      this.setState({
        wantToUpdateMessage: message.id
      });
    }.bind(this);
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
      files: [],
      file: null,
      me: getMe(),
      wantToUpdateMessage: ""
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  updateGroup: function (group) {
    let slug = this.context.router.getCurrentParams().slug;
    GroupActions.updateGroup(slug, group);
  },

  componentWillMount: function () {
    let slug = this.context.router.getCurrentParams().slug;
    GroupActions.loadGroup(slug);
    GroupActions.loadGroupMessages(slug);
    GroupActions.loadGroupFiles(slug);
    GroupActions.loadGroupMembers(slug);
    GroupActions.loadGroupNewMembers(slug);
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

  onGroupChange: function () {
    //console.log("onGroupChange", getData());
    this.setState(getData());
  },

  componentDidMount: function () {
    GroupStore.addChangeListener(this.onGroupChange);
    UsersStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    GroupStore.removeChangeListener(this.onGroupChange)
    UsersStore.removeChangeListener(this.onChange);
  },

  accept: function (group, memeber) {
    return function (e) {
      GroupActions.acceptMember(memeber, group);
    }.bind(this);
  },

  refuse: function (group, memeber) {
    return function (e) {
      GroupActions.deleteGroupMember(memeber.id, group.id);
    }.bind(this);
  },

  deleteMessageGroup: function (message) {
    GroupActions.deleteMessageGroup(message);
  }

});

let dropzoneStyle = {
  width: '100%',
  height: 50,
  borderStyle: "dashed",
  marginTop: '10px'
}
