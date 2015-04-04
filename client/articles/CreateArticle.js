var React = require('react/addons');
var markdown = require("markdown").markdown;

var moment = require('moment');
var utils = require('../../commun/utils');

var ArticlesActions = require('./ArticlesActions');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

var CreateArticle = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
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
            publish: moment().format(utils.mysqlDateFormat)
        };
    },
    render: function() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={6}>
                        <h1>Create new Article</h1>
                        <Input
                            type='text'
                            placeholder='Title'
                            label='Title'
                            ref='title'
                            valueLink={this.linkState('title')}
                        />
                        <Input
                            type='textarea'
                            rows={20}
                            label='Body'
                            ref='body'
                            valueLink={this.linkState('body')}
                        />
                        <Input
                            type='date'
                            ref='publish'
                            label='Publish'
                            valueLink={this.linkState('publish')}
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
