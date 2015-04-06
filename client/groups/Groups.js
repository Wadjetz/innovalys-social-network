/*** @jsx React.DOM */
var React  = require('react');
var Reflux = require('reflux');

var Grid = require('react-bootstrap/lib/Grid');
var Row  = require('react-bootstrap/lib/Row');
var Col  = require('react-bootstrap/lib/Col');

var GroupsStore   = require('./GroupsStore');
var GroupsActions = require('./GroupsActions');
var GroupView     = require('./GroupView');

var Loader = require('halogen').GridLoader;
var If     = require('../If');

var Chat = require('../chat/Chat');

var Groups = React.createClass({
    mixins: [
        Reflux.connect(GroupsStore)
    ],
    render: function() {
        var groups = this.state.groups.map(function (group, i) {
            return (
                <GroupView group={article} key={i} />
            );
        });
        return (
            <Grid>
                <If condition={this.state.loading}>
                    <Row>
                        <Col xs={2} mdOffset={5}>
                            <Loader color="#26A65B" size="16px" margin="4px"/>
                        </Col>
                    </Row>
                </If>
                <Row>
                    <Col xs={8}>
                        {groups}
                    </Col>
                    <Col xs={4}>
                        <Chat />
                    </Col>
                </Row>
            </Grid>
        );
    },
    componentWillMount: function() {
        GroupsActions.loadGroups();
    }
});

module.exports = Groups;
