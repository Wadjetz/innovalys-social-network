/*** @jsx React.DOM */
const React         = require('react');
const isEmpty       = require('lodash/lang/isempty');
const GroupsStore   = require('./GroupsStore');
const GroupsActions = require('./GroupsActions');
const Grid          = require('react-bootstrap/lib/Grid');
const Row           = require('react-bootstrap/lib/Row');
const Col           = require('react-bootstrap/lib/Col');
const If            = require('../utils/If');
const GroupView     = require('./GroupView');

function getSingleGroup() {
    return {
        singleGroup: GroupsStore.getSingleGroup()
    }
}

const SingleGroup = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        console.debug("SingleGroup.render", this.state);
        let group = this.state.singleGroup.group;
        let membersView = this.state.singleGroup.members.map((memeber, i) => (<div key={i}>{memeber.first_name}</div>));
        return (
            <Grid>
                <Row>
                    <Col xs={8}>
                        <If condition={!isEmpty(group)}>
                            <GroupView group={group} />
                        </If>
                    </Col>
                    <Col xs={4}>
                        {membersView}
                    </Col>
                </Row>
            </Grid>
        );
    },
    getInitialState: function () {
        return getSingleGroup();
    },
    onChange: function (articles) {
        this.setState(getSingleGroup());
    },
    componentDidMount: function () {
        GroupsActions.loadSingleGroup(this.context.router.getCurrentParams().slug);
        GroupsStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        GroupsStore.removeChangeListener(this.onChange);
    }
});

module.exports = SingleGroup;
