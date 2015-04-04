var React = require('react');
var markdown = require("markdown").markdown;

var ArticlesActions = require('./ArticlesActions');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

var CreateArticle = React.createClass({
    submit: function () {
        // TODO validate data
        var newArticle = {
            title: this.state.title,
            body: this.state.body,
            publish: this.state.publish
        };
        ArticlesActions.createArticle(newArticle);
        console.log("CreateArticle", "submit", newArticle);
    },
    getInitialState: function() {
        return {
            title: "",
            body: "",
            publish: ""
        };
    },
    handleChange: function () {
        this.setState({
            title: this.refs.title.getValue(),
            body: this.refs.body.getValue(),
            publish: this.refs.publish.getValue()
        });
    },
    render: function() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={6}>
                        <h1>Create new Article</h1>
                        <Input
                            type='text'
                            value={this.state.title}
                            placeholder='Title'
                            label='Title'
                            ref='title'
                            onChange={this.handleChange}
                        />
                        <Input
                            type='textarea'
                            rows={20}
                            value={this.state.body}
                            label='Body'
                            ref='body'
                            onChange={this.handleChange}
                        />
                        <Input
                            type='date'
                            ref='publish'
                            label='Publish'
                            value={this.state.publish}
                            onChange={this.handleChange}
                        />
                        <Button bsStyle='success' onClick={this.submit}>Save</Button>
                    </Col>
                    <Col xs={12} sm={6}>
                        <h1>Preview</h1>
                        <h1>{this.state.title}</h1>
                        <p dangerouslySetInnerHTML={{__html: markdown.toHTML(this.state.body) }}></p>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = CreateArticle;
