import React from 'react/addons'
import Bootstrap, { Row, Col, Input, Button } from 'react-bootstrap'
import ChatActions from './ChatActions'
import ChatStore from './ChatStore'
import i18n from '../../commun/local'

export default React.createClass({
  displayName: "MessageSender",
  mixins: [ React.addons.LinkedStateMixin ],
  render: function () {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={i18n.__n('message')}
          ref='message'
          valueLink={this.linkState('message')} />

        <span className="input-group-btn">
          <button
            className="btn btn-success"
            disabled={this.state.message === ""}
            onClick={this.submit}>
            {i18n.__n('send')}
          </button>
        </span>
      </div>
    );
  },
  getInitialState: function() {
    return {
      message: ""
    };
  },
  submit: function () {
    ChatActions.sendMessage(this.state.message);
    this.setState({
      message: ""
    })
  }
});
