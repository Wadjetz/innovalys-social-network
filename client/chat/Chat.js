const React         = require('react');
const Row           = require('react-bootstrap/lib/Row');
const Col           = require('react-bootstrap/lib/Col');
const Input         = require('react-bootstrap/lib/Input');
const Button        = require('react-bootstrap/lib/Button');
const ChatActions   = require('./ChatActions');
const ChatStore     = require('./ChatStore');
const MessageSender = require('./MessageSender');

const style = {
    height: '200px',
    marginBottom: '10px',
    padding: '2px',
    border: '1px solid #999',
    borderRadius: '3px',
    overflowX: 'auto',
    overflowY: 'auto'
};

function getMessages() {
    return {
        messages: ChatStore.getMessages()
    };
}

const Chat = React.createClass({
    render: function () {
        let messages = this.state.messages.map((message, i) => (<div key={i}>{message.content}</div>));
        return (
            <Row>
                <h2>Chat</h2>
                <div style={style}>
                    {messages}
                </div>
                <MessageSender />
            </Row>
        );
    },
    getInitialState: function () {
        ChatActions.loadMessages();
        return getMessages();
    },
    onChange: function () {
        this.setState(getMessages());
    },
    componentDidMount: function () {
        ChatStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        ChatStore.removeChangeListener(this.onChange);
    }
});

module.exports = Chat;
