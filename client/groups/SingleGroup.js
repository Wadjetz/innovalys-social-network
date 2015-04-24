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
        console.debug("SingleGroup.render", this.state);
        var group = this.state.singleGroup.group;
        var membersView = this.state.singleGroup.members.map(function (memeber, i) {
            return (
                <div key={i}>{memeber.first_name}</div>
            );
        });
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
                    <Col xs={8}>
                        <GroupView group={group} />
                    </Col>
                    <Col xs={4}>
                        {membersView}
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
