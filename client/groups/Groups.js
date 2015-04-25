/*** @jsx React.DOM */
const React         = require('react');
const Grid          = require('react-bootstrap/lib/Grid');
const Row           = require('react-bootstrap/lib/Row');
const Col           = require('react-bootstrap/lib/Col');
const GroupsStore   = require('./GroupsStore');
const GroupsActions = require('./GroupsActions');
const GroupView     = require('./GroupView');
const If            = require('../utils/If');
const Chat          = require('../chat/Chat');

function getGroups () {
    return {
        groups: GroupsStore.getGroups()
    };
}

const Groups = React.createClass({
    render: function() {
        let groups = this.state.groups.map((group, i) => (<GroupView group={group} key={i} />));
        return (
            <Grid>
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
    getInitialState: function () {
        GroupsActions.loadGroups();
        return getGroups();
    },
    onChange: function () {
        this.setState(getGroups());
    },
    componentDidMount: function () {
        GroupsStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        GroupsStore.removeChangeListener(this.onChange);
    }
});

module.exports = Groups;
