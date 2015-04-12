var React  = require('react/addons');
var Reflux = require('reflux');

var markdown = require("markdown").markdown;
var moment = require('moment');
var utils  = require('../../commun/utils');

var ArticlesActions = require('./ArticlesActions');
var UsersActions = require('../user/UsersActions');

var Grid   = require('react-bootstrap/lib/Grid');
var Row    = require('react-bootstrap/lib/Row');
var Col    = require('react-bootstrap/lib/Col');
var Input  = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Alert  = require('react-bootstrap/lib/Alert');
var If     = require('../If');

var CreateArticle = React.createClass({
    mixins: [
        React.addons.LinkedStateMixin,
        Reflux.listenTo(ArticlesActions.createArticle.completed, 'onCreateArticleCompleted')
    ],
    render: function() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={6}>
                        <h1>Create new Article</h1>
                        <If condition={this.state.error !== ""}>
                            <Alert bsStyle='danger'>
                                {this.state.error}
                            </Alert>
                        </If>
                        <If condition={this.state.success !== ""}>
                            <Alert bsStyle='success'>
                                {this.state.success}
                            </Alert>
                        </If>
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
    },
    submit: function () {
        // TODO validate data
        var newArticle = {
            title: this.state.title,
            body: this.state.body,
            publish: this.state.publish
        };
        console.log("CreateArticle", "submit", newArticle);
        ArticlesActions.createArticle(newArticle);
    },
    onCreateArticleCompleted: function (err, result) {
        console.log("onCreateArticleCompleted", err, result);
        if (err) {
            this.setState({
                error: "Error to create article",
                success: ""
            })
        } else {
            this.setState({
                error: "",
                success: "Article Created successful"
            })
        }
    },
    componentWillMount: function () {
        UsersActions.loadMe();
    },
    getInitialState: function() {
        return {
            title: "",
            body: "",
            publish: moment().format(utils.mysqlDateFormat),
            error: "",
            success: ""
        };
    }
});

module.exports = CreateArticle;
