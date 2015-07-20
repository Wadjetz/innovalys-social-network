import React from 'react/addons';
import { Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col, ListGroup, ListGroupItem, Button, Input } from 'react-bootstrap';
import GroupsService from './GroupsService';
import i18n from '../../commun/local';
import GroupsValidator from '../../commun/groups-validator';

export default React.createClass({
  displayName: "GroupMessageForm",
  mixins: [React.addons.LinkedStateMixin, Navigation],

  render: function () {
    let err = this.state.errors;
    return (
      <div>
        <div className={ (err.content) ? 'form-group has-error' : 'form-group'}>
          <label className="control-label" htmlFor="content">{ (err.content) ? err.content : i18n.__n('content')}</label>
          <textarea className="form-control" id="content" placeholder={i18n.__n('content')} ref='content' valueLink={this.linkState('content')} />
        </div>
        <Button bsStyle='success' onClick={this.successAction}>{i18n.__n('save')}</Button>
      </div>
    );
  },

  successAction: function () {
    let content = this.state.content;
    GroupsValidator.groupMessageValidate({
      content: content
    }).then(newMessage => {
      console.log("successAction", newMessage, this.state, this.props);
      this.setState({ errors: {}, content: "" });
      this.props.successAction(newMessage, this.props.groupMessage);
    }).fail(err => {
      console.log(err);
      this.setState({ errors: err });
    });
  },

  propTypes: {
    successAction: React.PropTypes.func.isRequired,
    groupMessage: React.PropTypes.object
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      content: props.groupMessage.content || "",
    });
  },

  getInitialState: function() {
    return {
      content: this.props.groupMessage.content || "",
      errors: {}
    }
  },
});
