var React = require('react/addons');
var Reflux = require('reflux');
var utils = require('../../commun/utils');

var UsersActions = require('./UsersActions');
var UsersStore = require('./UsersStore');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

var Login = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        React.addons.LinkedStateMixin
    ],
    render: function() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Login</h1>
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
        };
    },
    onLogin: function (result) {
        console.log("Login", "onLogin", "result=", result);
    },
    componentDidMount: function() {
        this.unLogin = UsersStore.listen(this.onLogin);
    },
    componentWillUnmount: function() {
        this.unLogin();
    },
});

module.exports = Login;
