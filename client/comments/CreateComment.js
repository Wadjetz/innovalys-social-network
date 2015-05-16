const React           = require('react/addons');
const Grid            = require('react-bootstrap/lib/Grid');
const Row             = require('react-bootstrap/lib/Row');
const Col             = require('react-bootstrap/lib/Col');
const Input           = require('react-bootstrap/lib/Input');
const Button          = require('react-bootstrap/lib/Button');
const moment          = require('moment');
const utils           = require('../../commun/utils');
const CommentsActions = require('./CommentsActions');

const CreateComment = React.createClass({
    mixins: [
        React.addons.LinkedStateMixin
    ],
    submit: function () {
        // TODO validate data
        let newComment = {
            content: this.state.content,
            news_id: this.props.article.id
        };
        console.log("CreateComment.submit", "newComment", newComment);
        CommentsActions.createComment(newComment);
        this.setState({
            content: ""
        });
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
    }
});

module.exports = CreateComment;
