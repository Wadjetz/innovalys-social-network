var React  = require('react');
var Reflux = require('reflux');

var ArticlesActions = require('./ArticlesActions');
var ArticleView     = require('./ArticleView');

var Comments      = require('../comments/Comments');
var CreateComment = require('../comments/CreateComment');


var Grid = require('react-bootstrap/lib/Grid');
var Row  = require('react-bootstrap/lib/Row');
var Col  = require('react-bootstrap/lib/Col');

var Loader = require('halogen').RingLoader;
var If     = require('../If');

var SingleArticle = React.createClass({
    mixins: [
        Reflux.listenTo(ArticlesActions.loadSingleArticle.completed, 'onLoadCompletedSingleArticle'),
    ],
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        console.log("SingleArticle.render", this.state.article);
        return (
            <Grid>
                <If condition={this.state.loading}>
                    <Row>
                        <Col xs={2} mdOffset={5}>
                            <Loader color="#26A65B" size="150px" margin="4px"/>
                        </Col>
                    </Row>
                </If>
                <Row>
                    <Col xs={12}>
                        <If condition={this.state.article !== null}>
                            <ArticleView article={this.state.article} />
                        </If>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <If condition={this.state.article !== null}>
                            <CreateComment article={this.state.article} />
                        </If>
                    </Col>
                    <Col xs={12}>
                        <If condition={this.state.article !== null}>
                            <Comments article={this.state.article} />
                        </If>
                    </Col>
                </Row>

            </Grid>
        );
    },
    onLoadCompletedSingleArticle: function (article) {
        console.log("SingleArticle.onLoadCompletedSingleArticle", "article", article);
        this.setState({
            article: article,
            loading: false
        });
    },
    getInitialState: function () {
        console.log("getInitialState.slug", this.context.router.getCurrentParams().slug);
        ArticlesActions.loadSingleArticle(this.context.router.getCurrentParams().slug, []);
        return {
            article: null,
            loading: true
        };
    }
});

module.exports = SingleArticle;
