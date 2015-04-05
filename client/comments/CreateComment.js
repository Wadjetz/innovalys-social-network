var React = require('react/addons');
var Reflux = require('reflux');

var moment = require('moment');
var utils = require('../../commun/utils');

var CommentsActions = require('./CommentsActions');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

var CreateComment = React.createClass({
    mixins: [
        React.addons.LinkedStateMixin,
        Reflux.listenTo(CommentsActions.createComment.completed, 'onCreateCommentCompleted'),
    ],
    submit: function () {
        // TODO validate data
        var newComment = {
            content: this.state.content,
            news_id: this.props.article.id
        };
        console.log("CreateComment.submit", "newComment", newComment);
        CommentsActions.createComment(newComment);
    },
    getInitialState: function() {
        return {
            content: ""
        };
    },
    render: function() {
        return (
            <Row>
                <Col xs={12}>
                    <h4>Create new comment</h4>
                    <Input
                        type='textarea'
                        placeholder='Content'
                        label='Content'
                        ref='content'
                        valueLink={this.linkState('content')}
                    />
                    <Button bsStyle='success' onClick={this.submit}>Save</Button>
                </Col>
            </Row>
        );
    },
    onCreateCommentCompleted: function (newComment) {
        console.log("CreateComment.onCreateCommentCompleted", "newComment", newComment);
    }
});

module.exports = CreateComment;
