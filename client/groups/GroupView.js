/*** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var moment = require('moment');
var markdown = require("markdown").markdown;
var Link = Router.Link;

var GroupsStore   = require('./GroupsStore');
var GroupsActions = require('./GroupsActions');
var GroupView     = require('./GroupView');

var Loader = require('halogen').GridLoader;
var If     = require('../If');

var Label = require('react-bootstrap/lib/Label');
var Button = require('react-bootstrap/lib/Button');

var GroupView = React.createClass({
    mixins: [
        Reflux.listenTo(GroupsActions.joinGroup.completed, 'onJoinGroupCompleted'),
        Reflux.listenTo(GroupsActions.joinGroup.failed, 'onJoinGroupFailed')
    ],
    render: function() {
        var group = this.props.group;
        console.log("GroupView", "render", group);
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
    },
    onJoinGroupCompleted: function (result) {
        console.debug("GroupView.onJoinGroupCompleted", "result", result);
    },
    onJoinGroupFailed: function (error) {
        console.debug("GroupView.onJoinGroupFailed", "error", error);
    }
});

module.exports = GroupView;
