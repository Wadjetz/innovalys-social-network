var React = require('react');
var Router = require('react-router');
var markdown = require("markdown").markdown;
var Link = Router.Link;
var moment = require('moment');

var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

var CommentView = React.createClass({
    render: function() {
        var comment = this.props.comment;
        return (
            <ListGroup>
                <ListGroupItem header={comment.email}>
                    <span dangerouslySetInnerHTML={{__html: markdown.toHTML(comment.content) }}></span>
                </ListGroupItem>
            </ListGroup>
        );
    },
});

module.exports = CommentView;
