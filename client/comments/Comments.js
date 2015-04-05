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
        Reflux.ListenerMixin
    ],
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var comments = this.state.comments.map(function (comment) {
            return (
                <CommentView comment={comment} key={comment.id} />
            );
        });
        return (
            <Row>
                <Col xs={12}>
                    <If condition={this.state.loading}>
                        <Loader color="#26A65B" size="16px" margin="4px"/>
                    </If>
                    <h3>Comments</h3>
                    {comments}
                </Col>
            </Row>
        );
    },
    getInitialState: function() {
        CommentsActions.loadComments(this.props.article.id);
        return {
            comments: [],
            loading: true
        };
    },
    componentDidMount: function() {
        this.unLoadComments = CommentsStore.listen(this.onLoadComments);
    },
    componentWillUnmount: function() {
        this.unLoadComments();
    },
    onLoadComments: function (comments) {
        console.log("Comments", "onLoadComments", comments);
        this.setState({
            comments: comments,
            loading: false
        });
    },
});

module.exports = Comments;
