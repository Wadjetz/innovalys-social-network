var React = require('react/addons');
var Reflux = require('reflux');
var moment = require('moment');
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

var Signup = React.createClass({
    mixins: [
        Reflux.connect(UsersStore),
        React.addons.LinkedStateMixin
    ],
    render: function() {
        // TODO add validators
        console.log("render", this.state);
        var rolesView = this.state.roles.map(function (role, i) {
            return (
                <option value={role} key={i}>{role}</option>
            );
        });
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Create new user</h1>
                        <If condition={this.state.result.error}>
                            <Alert bsStyle='danger'>
                                {this.state.result.message}
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
    submit: function () {
        // TODO validate data
        var newUser = {
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
        console.log("Sigup", "submit", newUser);
        UsersActions.createUser(newUser);
    },
    componentDidMount: function() {
        UsersActions.loadRoles()
    },
});

module.exports = Signup;
