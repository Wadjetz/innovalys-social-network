const React           = require('react/addons');
const isEmpty         = require('lodash/lang/isempty');
const markdown        = require("markdown").markdown;
const moment          = require('moment');
const utils           = require('../../commun/utils');
const ArticlesActions = require('./ArticlesActions');
const ArticlesStore   = require('./ArticlesStore')
const Grid            = require('react-bootstrap/lib/Grid');
const Row             = require('react-bootstrap/lib/Row');
const Col             = require('react-bootstrap/lib/Col');
const Input           = require('react-bootstrap/lib/Input');
const Button          = require('react-bootstrap/lib/Button');
const Alert           = require('react-bootstrap/lib/Alert');
const If              = require('../utils/If');

function getCreatedArticle() {
    return {
        title: "",
        body: "",
        publish: moment().format(utils.mysqlDateFormat),
        createArticleError: ArticlesStore.getCreateArticleError(),
        createdArticle: ArticlesStore.getCreatedArticle()
    }
}

const CreateArticle = React.createClass({
    mixins: [
        React.addons.LinkedStateMixin
    ],
    render: function() {
        console.log("CreateArticle.render", this.state);
        let createdArticle = this.state.createdArticle;
        let createArticleError = this.state.createArticleError;
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={6}>
                        <h1>Create new Article</h1>
                        <If condition={!isEmpty(createArticleError)}>
                            <Alert bsStyle='danger'>
                                {createArticleError}
                            </Alert>
                        </If>
                        <If condition={!isEmpty(createdArticle)}>
                            <Alert bsStyle='success'>
                                Success
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
        let newArticle = {
            title: this.state.title,
            body: this.state.body,
            publish: this.state.publish
        };
        console.log("CreateArticle", "submit", newArticle);
        ArticlesActions.createArticle(newArticle);
    },
    getInitialState: function() {
        return getCreatedArticle();
    },
    onChange: function (articles) {
        this.setState(getCreatedArticle());
    },
    componentDidMount: function () {
        ArticlesStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        ArticlesStore.removeChangeListener(this.onChange);
    }
});

module.exports = CreateArticle;
