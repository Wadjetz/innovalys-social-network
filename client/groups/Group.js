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

    let messagesView = this.state.messages.map(message =>
      <MessageGroup message={message} key={message.id} />
    );

    let filesView = this.state.files.map(file =>
      <FileGroup file={file} key={file.name + file.id}  />
    );

    let membersView = this.state.members.map(memeber =>
      <Member memeber={memeber} group={this.state.group} key={memeber.id} isAccepted={true}/>
    );

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
                  <GroupMessageForm />
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
        users_id: ""
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

  updateGroup: function (group) {
    console.log("updateGroup", group);
    let slug = this.context.router.getCurrentParams().slug;
    GroupsService.update(slug, group).then(updatedGroup => {
      this.setState({
        group: updatedGroup
      });
    }).fail(err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
      console.log("updateGroup err", err);
    });
  },

  componentWillMount: function () {
    let slug = this.context.router.getCurrentParams().slug;
    GroupsService.getBySlug(slug).then(group => {
      console.log("getGroupBySlug", group);
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

  accept: function (group, memeber) {
    return function (e) {
      GroupsService.acceptMember(memeber.id, group.id).then(result => {
        this.state.members.push(memeber);
        let newMembers = this.state.newMembers.filter(m => m.id !== memeber.id);
        this.setState({
          members: this.state.members,
          newMembers: newMembers
        });
      }).fail(err => {
        console.log("accept err", err);
      });
    }.bind(this);
  },

  refuse: function (group, memeber) {
    return function (e) {
      GroupsService.refuseMember(memeber.id, group.id).then(result => {
        let newMembers = this.state.newMembers.filter(m => m.id !== memeber.id);
        this.setState({
          newMembers: newMembers
        });
      }).fail(err => {
        console.log("refuse err", err);
      });
    }.bind(this);
  }

});

let dropzoneStyle = {
  width: '100%',
  height: 50,
  borderStyle: "dashed",
  marginTop: '10px'
};
