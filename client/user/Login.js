var React = require('react/addons');
var Reflux = require('reflux');
var utils = require('../../commun/utils');
var If = require('../If');

var UsersActions = require('./UsersActions');
var UsersStore = require('./UsersStore');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Alert = require('react-bootstrap/lib/Alert');

var Login = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        React.addons.LinkedStateMixin
    ],
    render: function() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={3}>
                        <h1>Login</h1>
                        <If condition={this.state.result.error}>
                            <Alert bsStyle='danger'>
                                {this.state.result.message}
                            </Alert>
                        </If>
                        <Input
                            type='text'
                            placeholder='Login'
                            label='Login'
                            ref='login'
                            valueLink={this.linkState('login')}
                        />
                        <Input
                            type='password'
                            placeholder='Password'
                            label='Password'
                            ref='password'
                            valueLink={this.linkState('password')}
                        />
                        <Button bsStyle='success' onClick={this.submit}>Login</Button>
                    </Col>
                </Row>
            </Grid>
        );
    },
    submit: function () {
        // TODO validate data
        var user = {
            login: this.state.login,
            password: this.state.password,
        };
        console.log("Login", "submit", user);
        UsersActions.login(user);
    },
    getInitialState: function() {
        return {
            login: "",
            password: "",
            result: {
                error: false,
                message: ""
            }
        };
    },
    onLogin: function (result) {
        this.setState({
            result: result
        });
    },
    componentDidMount: function() {
        this.unLogin = UsersStore.listen(this.onLogin);
    },
    componentWillUnmount: function() {
        this.unLogin();
    },
});

module.exports = Login;
