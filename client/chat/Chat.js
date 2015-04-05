var React  = require('react');
var Reflux = require('reflux');

var ChatActions = require('./ChatActions');
var ChatStore   = require('./ChatStore');

var Row  = require('react-bootstrap/lib/Row');
var Col  = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

var MessageSender = require('./MessageSender');

var style = {
	height: '200px',
	marginBottom: '10px',
	padding: '2px',
	border: '1px solid #999',
	borderRadius: '3px',
	overflowX: 'auto',
	overflowY: 'auto'
};

var Chat = React.createClass({
	mixins: [
        Reflux.connect(ChatStore)
    ],
	render: function () {
		var messages = this.state.messages.map(function (message, i) {
			return (
				<div key={i}>{message}</div>
			);
		});
		return (
			<Row>
				<h2>Chat</h2>
				<div style={style}>
					{messages}
				</div>
				<MessageSender />
			</Row>
		);
	}
});

module.exports = Chat;
