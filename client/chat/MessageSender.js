import React from 'react/addons';
import Bootstrap, { Row, Col, Input, Button } from 'react-bootstrap';
import ChatActions from './ChatActions';
import ChatStore from './ChatStore';
import i18n from '../../commun/local';

const KEY_ENTER = 13;

export default React.createClass({
  displayName: "MessageSender",
  mixins: [ React.addons.LinkedStateMixin ],
  render: function () {
    return (
      <Row>
        <Col xs={8}>
          <input
            type="text"
            className="form-control"
            placeholder={i18n.__n('message')}
            ref='message'
            onKeyDown={this.onKeyDown}
            valueLink={this.linkState('message')} />
        </Col>
        <Col xs={4}>
          <button
            className="btn btn-success btn-sm"
            disabled={this.state.message === ""}
            onClick={this.submit}>
            {i18n.__n('send')}
          </button>
        </Col>
      </Row>
    );
  },
  onKeyDown: function (e) {
    if (e.which === KEY_ENTER) {
      e.preventDefault();
      ChatActions.sendMessage(this.state.message);
      this.setState({
        message: ""
      })
    }
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
