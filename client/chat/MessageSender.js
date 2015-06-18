const React       = require('react/addons');
const ChatActions = require('./ChatActions');
const ChatStore   = require('./ChatStore');
const Row         = require('react-bootstrap/lib/Row');
const Col         = require('react-bootstrap/lib/Col');
const Input       = require('react-bootstrap/lib/Input');
const Button      = require('react-bootstrap/lib/Button');

const Chat = React.createClass({
    mixins: [ React.addons.LinkedStateMixin ],
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
                    <button className="btn btn-primary" disabled={this.state.message === ""} onClick={this.submit}>Send</button>
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
