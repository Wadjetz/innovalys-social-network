const React           = require('react');
const Grid            = require('react-bootstrap/lib/Grid');
const Row             = require('react-bootstrap/lib/Row');
const Col             = require('react-bootstrap/lib/Col');
const If              = require('../utils/If');
const CommentsStore   = require('./CommentsStore');
const CommentsActions = require('./CommentsActions');
const CommentView     = require('./CommentView');

function getComments() {
    return {
        comments: CommentsStore.getComments()
    };
}

const Comments = React.createClass({
    render: function() {
        let comments = this.state.comments.map(comment => <CommentView comment={comment} key={comment.id} />);
        return (
            <Row>
                <Col xs={12}>
                    <h3>Comments</h3>
                    {comments}
                </Col>
            </Row>
        );
    },
    getInitialState: function () {
        return getComments();
    },
    onChange: function (articles) {
        this.setState(getComments());
    },
    componentWillMount: function () {
        CommentsActions.loadComments(this.props.article.id)
        CommentsStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        CommentsStore.removeChangeListener(this.onChange);
    }
});

module.exports = Comments;
