var React  = require('react');
var Reflux = require('reflux');

var ArticlesActions = require('./ArticlesActions');
var ArticleView     = require('./ArticleView');

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
        console.log("SingleArticle.render", this.state.article)
        var articleView = this.state.article.map(function (article) {
            return (
                <ArticleView article={article} key={article.id} />
            );
        });
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
                        {articleView}
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
            article: [],
            loading: true
        };
    }
});

module.exports = SingleArticle;
