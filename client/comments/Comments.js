var React  = require('react');
var Reflux = require('reflux');

var CommentsStore   = require('./CommentsStore');
var CommentsActions = require('./CommentsActions');
var CommentView     = require('./CommentView');

var Grid = require('react-bootstrap/lib/Grid');
var Row  = require('react-bootstrap/lib/Row');
var Col  = require('react-bootstrap/lib/Col');

var Loader = require('halogen').GridLoader;
var If     = require('../If');

var Comments = React.createClass({
    mixins: [
        Reflux.connect(CommentsStore)
    ],
    render: function() {
        var comments = this.state.comments.map(function (comment) {
            return (
                <CommentView comment={comment} key={comment.id} />
            );
        });
        return (
            <Row>
                <Col xs={12}>
                    <h3>Comments</h3>
                    <If condition={this.state.loading}>
                        <Loader color="#26A65B" size="16px" margin="4px"/>
                    </If>
                    {comments}
                </Col>
            </Row>
        );
    },
    componentWillMount: function() {
        CommentsActions.loadComments(this.props.article.id);
    },
});

module.exports = Comments;
