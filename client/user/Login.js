var React  = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var utils  = require('../../commun/utils');

var UsersActions = require('./UsersActions');
var UsersStore   = require('./UsersStore');

var Grid   = require('react-bootstrap/lib/Grid');
var Row    = require('react-bootstrap/lib/Row');
var Col    = require('react-bootstrap/lib/Col');
var Input  = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Alert  = require('react-bootstrap/lib/Alert');

var If = require('../If');

var Login = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        React.addons.LinkedStateMixin,
        Router.Navigation
    ],
    render: function() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={3}>
                        <h1>Login</h1>
                        <If condition={this.state.error !== ""}>
                            <Alert bsStyle='danger'>
                                {this.state.error}
                            </Alert>
                        </If>
                        <Input
                            type='text'
                            placeholder='Email'
                            label='Email'
                            ref='email'
                            valueLink={this.linkState('email')}
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
            email: this.state.email,
            password: this.state.password,
        };
        console.log("Login.submit", "user", user);
        UsersActions.login(user);
    },
    getInitialState: function() {
        // TODO remove mock
        return {
            email: "egor@neon.fr",
            password: "BMi1z2Rn",
            error: ""
        };
    },
    onLogin: function (result) {
        console.log("Login.onLogin", result);
        if (result.error) {
            this.setState({
                error: result.error
            });
        } else {
            this.context.router.transitionTo('articles');
        }
    },
    componentDidMount: function() {
        this.unLogin = UsersStore.listen(this.onLogin);
    },
    componentWillUnmount: function() {
        this.unLogin();
    },
});

module.exports = Login;
