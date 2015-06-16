const React         = require('react/addons');
const Router        = require('react-router');
const Grid          = require('react-bootstrap/lib/Grid');
const Row           = require('react-bootstrap/lib/Row');
const Col           = require('react-bootstrap/lib/Col');
const Input         = require('react-bootstrap/lib/Input');
const Button        = require('react-bootstrap/lib/Button');
const Alert         = require('react-bootstrap/lib/Alert');
const validate      = require("validate.js");
const userValidator = require('../../commun/user-validator');
const UsersActions  = require('./UsersActions');
const UsersStore    = require('./UsersStore');
const If            = require('../utils/If');

const Login = React.createClass({
    mixins: [
        React.addons.LinkedStateMixin,
        Router.Navigation
    ],
    render: function() {
        let validator = validate(this.state, userValidator.loginConstraints);
        let loginError = this.state.loginError;
        //console.debug("Login.render", this.state);
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={3}>
                        <h1>Login</h1>
                        <If condition={loginError !== ""}>
                            <Alert bsStyle='danger'>
                                {loginError}
                            </Alert>
                        </If>
                        <Input
                            type='email'
                            placeholder='Email'
                            label='Email'
                            ref='email'
                            valueLink={this.linkState('email')}
                            bsStyle={ (validator && validator.email) ? "error": "success" }
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
        let user = {
            email: this.state.email,
            password: this.state.password,
        };
        //console.log("Login.submit", "user", user);
        let validator = validate(user, userValidator.loginConstraints);
        if (validator) {
            console.log(validator);
        } else {
            UsersActions.login(user);
        }
    },
    getInitialState: function() {
        // TODO remove mock
        return {
            email: "root@root.com",
            password: "uYK4UQZ_",
            loginError: UsersStore.getLoginError(),
            validator: validate(this, userValidator.loginConstraints)
        };
    },
    onChange: function () {
        if(UsersStore.isConnected()) {
            UsersActions.loadMe();
            this.context.router.transitionTo('articles');
        }
        else {
            this.setState({
                loginError: UsersStore.getLoginError(),
            });
        }
    },
    componentDidMount: function () {
        UsersStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        UsersStore.removeChangeListener(this.onChange);
    }
});

module.exports = Login;
