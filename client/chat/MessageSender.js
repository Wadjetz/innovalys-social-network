var React  = require('react/addons');
var Reflux = require('reflux');

var ChatActions = require('./ChatActions');
var ChatStore   = require('./ChatStore');

var Row  = require('react-bootstrap/lib/Row');
var Col  = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

var Chat = React.createClass({
	mixins: [
        React.addons.LinkedStateMixin
    ],
	render: function () {
		return (
			<div className="input-group">
  				<input
					type="text"
					className="form-control"
					placeholder='Message'
					ref='message'
					valueLink={this.linkState('message')} />

  				<span className="input-group-btn">
    				<button className="btn btn-success" disabled={this.state.message === ""} onClick={this.submit}>Send</button>
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

module.exports = Chat;
