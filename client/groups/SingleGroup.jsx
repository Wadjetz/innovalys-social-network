/*** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var GroupsStore = require('./GroupsStore');
var GroupsActions = require('./GroupsActions');

var Grid = require('react-bootstrap/lib/Grid');
var Row  = require('react-bootstrap/lib/Row');
var Col  = require('react-bootstrap/lib/Col');

var Loader = require('halogen').RingLoader;
var If     = require('../If');

var GroupView = require('./GroupView');

var SingleGroup = React.createClass({
    mixins: [
        Reflux.connect(GroupsStore)
    ],
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        console.log("SingleGroup.render", this.state.singleGroup);
        return (
            <Grid>
                <If condition={this.state.loading}>
                    <Row>
                        <Col xs={2} mdOffset={5}>
                            <Loader color="#26A65B" size="150px" margin="4px"/>
                        </Col>
                    </Row>
                </If>
                <Row>
                    <Col xs={12}>
                        <If condition={this.state.singleGroup !== null}>
                            <GroupView group={this.state.singleGroup} />
                        </If>
                    </Col>
                </Row>
            </Grid>
        );
    },
    componentWillMount: function () {
        GroupsActions.loadSingleGroup(this.context.router.getCurrentParams().slug);
    }
});

module.exports = SingleGroup;
