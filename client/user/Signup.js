const React        = require('react/addons');
const moment       = require('moment');
const isEmpty      = require('lodash/lang/isempty');
const utils        = require('../../commun/utils');
const If           = require('../utils/If');
const UsersActions = require('./UsersActions');
const UsersStore   = require('./UsersStore');
const Grid         = require('react-bootstrap/lib/Grid');
const Row          = require('react-bootstrap/lib/Row');
const Col          = require('react-bootstrap/lib/Col');
const Input        = require('react-bootstrap/lib/Input');
const Button       = require('react-bootstrap/lib/Button');
const Alert        = require('react-bootstrap/lib/Alert');

function getData() {
    return {
        roles: UsersStore.getRoles(),
        signupResult: UsersStore.getSignupResult(),
        signupError: UsersStore.getSignupError()
    };
}

const Signup = React.createClass({
    mixins: [ React.addons.LinkedStateMixin ],
    render: function() {
        // TODO add validators
        console.debug("Signup.render", this.state);
        let rolesView = this.state.roles.map((role, i) => (<option value={role} key={i}>{role}</option>));
        let signupResult = this.state.signupResult;
        let signupError  = this.state.signupError;
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Create new user</h1>
                        <If condition={!isEmpty(signupError)}>
                            <Alert bsStyle='danger'>
                                {signupError}
                            </Alert>
                        </If>
                        <If condition={signupResult.access.email !== ""}>
                            <Alert bsStyle='success'>
                                {signupResult.access.email} : {signupResult.access.password}
                            </Alert>
                        </If>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Input
                                    type='text'
                                    placeholder='First Name'
                                    label='First Name'
                                    ref='first_name'
                                    valueLink={this.linkState('first_name')}
                                />
                            </Col>
                            <Col xs={12} sm={6}>
                                <Input
                                    type='text'
                                    placeholder='Last Name'
                                    label='Last Name'
                                    ref='last_name'
                                    valueLink={this.linkState('last_name')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    label='Email'
                                    ref='email'
                                    valueLink={this.linkState('email')}
                                />
                            </Col>
                            <Col xs={12} sm={6}>
                                <Input
                                    type='date'
                                    ref='birthday_date'
                                    label='Birthday Date'
                                    valueLink={this.linkState('birthday_date')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Input
                                    type='text'
                                    placeholder='Function'
                                    label='Function'
                                    ref='function'
                                    valueLink={this.linkState('function')}
                                />
                            </Col>
                            <Col xs={12} sm={6}>
                                <Input
                                    type='date'
                                    ref='arrival_date'
                                    label='Arrival Date'
                                    valueLink={this.linkState('arrival_date')}
                                />
                            </Col>
                        </Row>
                        <Input type='select' label='Select' placeholder='select' ref='role' valueLink={this.linkState('role')}>
                            {rolesView}
                        </Input>
                        <Input
                            type='text'
                            placeholder='Adress'
                            label='Adress'
                            ref='adress'
                            valueLink={this.linkState('adress')}
                        />
                        <Input
                            type='textarea'
                            placeholder='Description'
                            label='Description'
                            ref='description'
                            valueLink={this.linkState('description')}
                        />
                        <Button bsStyle='success' onClick={this.submit}>Save</Button>
                    </Col>
                </Row>
            </Grid>
        );
    },
    getInitialState: function() {
        // TODO remove data mock
        return {
            email: (Math.random() * 1000) + "@domain.com",
            first_name: "First Name",
            last_name: "Last Name",
            birthday_date: moment().format(utils.mysqlDateFormat),
            adress: "rue bidon",
            role: "user",
            function: "peon",
            description: "descr",
            arrival_date: moment().format(utils.mysqlDateFormat),
            roles: getData().roles,
            signupResult: getData().signupResult,
            signupError: getData().signupError
        };
    },
    submit: function () {
        // TODO validate data
        let newUser = {
            email: this.state.email,
            birthday_date: this.state.birthday_date,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            adress: this.state.adress,
            function: this.state.function,
            description: this.state.description,
            arrival_date: this.state.arrival_date,
            role: this.state.role
        };
        console.info("Sigup", "submit", newUser);
        UsersActions.createUser(newUser);
    },
    onChange: function () {
        this.setState(getData());
    },
    componentDidMount: function () {
        UsersActions.loadMe();
        UsersActions.loadRoles()
        UsersStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        UsersStore.removeChangeListener(this.onChange);
    }
});

module.exports = Signup;
