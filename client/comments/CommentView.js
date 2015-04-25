const React         = require('react');
const Router        = require('react-router');
const markdown      = require("markdown").markdown;
const Link          = Router.Link;
const moment        = require('moment');
const ListGroup     = require('react-bootstrap/lib/ListGroup');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

const CommentView = React.createClass({
    render: function() {
        let comment = this.props.comment;
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
