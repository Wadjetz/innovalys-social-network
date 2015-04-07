/*** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var markdown = require("markdown").markdown;
var Link = Router.Link;

var Label = require('react-bootstrap/lib/Label');

var GroupView = React.createClass({
    render: function() {
        var group = this.props.group;
        console.log("GroupView", "render", group);
        return (
            <div className="thumbnail">
                <h2><Link to="singleGroup" params={{slug: group.slug}}>{group.name}</Link></h2>
                <p>{group.description}</p>
                <Label bsStyle='default'>{group.type}</Label>
            </div>
        );
    },
});

module.exports = GroupView;