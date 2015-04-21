/*** @jsx React.DOM */
var React  = require('react/addons');
var Reflux = require('reflux');

var markdown = require("markdown").markdown;
var moment = require('moment');
var utils  = require('../../commun/utils');

var GroupsActions = require('./GroupsActions');

var Grid   = require('react-bootstrap/lib/Grid');
var Row    = require('react-bootstrap/lib/Row');
var Col    = require('react-bootstrap/lib/Col');
var Input  = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Alert  = require('react-bootstrap/lib/Alert');
var If     = require('../If');

var CreateGroup = React.createClass({
    mixins: [
        React.addons.LinkedStateMixin,
        Reflux.listenTo(GroupsActions.createGroup.completed, 'onCreateGroupCompleted')
    ],
    render: function() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12}>
                        <h1>Create new Group</h1>
                        <If condition={this.state.error !== ""}>
                            <Alert bsStyle='danger'>
                                {this.state.error}
                            </Alert>
                        </If>
                        <If condition={this.state.success !== ""}>
                            <Alert bsStyle='success'>
                                {this.state.success}
                            </Alert>
                        </If>
                        <Input
                            type='text'
                            placeholder='Name'
                            label='Name'
                            ref='name'
                            valueLink={this.linkState('name')}
                        />
                        <Input
                            type='textarea'
                            rows={4}
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
        var newGroup = {
            name: this.state.name,
            description: this.state.description,
        };
        console.log("CreateGroup", "submit", newGroup);
        GroupsActions.createGroup(newGroup);
    },
    onCreateGroupCompleted: function (err, result) {
        console.log("onCreateGroupCompleted", err, result);
        if (err) {
            this.setState({
                error: "Error to create article",
                success: ""
            })
        } else {
            this.setState({
                error: "",
                success: "Article Created successful"
            })
        }
    },
    getInitialState: function() {
        return {
            name: "",
            description: "",
            error: "",
            success: ""
        };
    }
});

module.exports = CreateGroup;
