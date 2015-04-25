/*** @jsx React.DOM */
const React    = require('react/addons');
const markdown = require("markdown").markdown;
const moment   = require('moment');
const isEmpty  = require('lodash/lang/isempty');
const assign   = require('lodash/object/assign');
const utils    = require('../../commun/utils');

const GroupsActions = require('./GroupsActions');
const GroupsStore   = require('./GroupsStore');

const Grid   = require('react-bootstrap/lib/Grid');
const Row    = require('react-bootstrap/lib/Row');
const Col    = require('react-bootstrap/lib/Col');
const Input  = require('react-bootstrap/lib/Input');
const Button = require('react-bootstrap/lib/Button');
const Alert  = require('react-bootstrap/lib/Alert');
const If     = require('../utils/If');

function getCreatedGroup() {
    return {
        createdGroup: GroupsStore.getCreatedGroup(),
        createGroupError: GroupsStore.getCreateGroupError()
    }
}

const CreateGroup = React.createClass({
    mixins: [ React.addons.LinkedStateMixin ],
    render: function() {
        let createdGroup = this.state.createdGroup;
        let createGroupError = this.state.createGroupError;
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12}>
                        <h1>Create new Group</h1>
                        <If condition={!isEmpty(createGroupError)}>
                            <Alert bsStyle='danger'>
                                {createGroupError}
                            </Alert>
                        </If>
                        <If condition={!isEmpty(createdGroup)}>
                            <Alert bsStyle='success'>
                                {createdGroup}
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
    getInitialState: function() {
        return assign({
            name: "",
            description: "",
        }, getCreatedGroup());
    },
    onChange: function (articles) {
        this.setState(getCreatedGroup());
    },
    componentDidMount: function () {
        GroupsStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        GroupsStore.removeChangeListener(this.onChange);
    }
});

module.exports = CreateGroup;
