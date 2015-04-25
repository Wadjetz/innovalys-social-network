/*** @jsx React.DOM */
const React         = require('react');
const Router        = require('react-router');
const moment        = require('moment');
const markdown      = require("markdown").markdown;
const Link          = Router.Link;
const GroupsStore   = require('./GroupsStore');
const GroupsActions = require('./GroupsActions');
const If            = require('../utils/If');
const Label         = require('react-bootstrap/lib/Label');
const Button        = require('react-bootstrap/lib/Button');

const GroupView = React.createClass({
    render: function() {
        let group = this.props.group;
        //console.debug("GroupView", "render", group);
        return (
            <div className="thumbnail">
                <h2><Link to="singleGroup" params={{slug: group.slug}}>{group.name}</Link></h2>
                <Label bsStyle='default'>{group.type}</Label>
                <p>{group.description}</p>
                <Button onClick={this.join}>Join</Button>
            </div>
        );
    },
    join: function () {
        console.debug("GroupView.join", "group", this.props.group);
        GroupsActions.joinGroup(this.props.group);
    }
});

module.exports = GroupView;
