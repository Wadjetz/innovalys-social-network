var React  = require('react');
var Reflux = require('reflux');

var ArticlesStore   = require('./ArticlesStore');
var ArticlesActions = require('./ArticlesActions');
var ArticleView     = require('./ArticleView');

var Grid = require('react-bootstrap/lib/Grid');
var Row  = require('react-bootstrap/lib/Row');
var Col  = require('react-bootstrap/lib/Col');

var Loader = require('halogen').GridLoader;
var If     = require('../If');

var Articles = React.createClass({
    mixins: [
        Reflux.ListenerMixin
    ],
    render: function() {
        var articles = this.state.articles.map(function (article) {
            return (
                <ArticleView article={article} key={article.id} />
            );
        });
        return (
            <Grid fluid>
                <If condition={this.state.loading}>
                    <Row>
                        <Col xs={2} mdOffset={5}>
                            <Loader color="#26A65B" size="16px" margin="4px"/>
                        </Col>
                    </Row>
                </If>
                <Row>
                    <Col xs={12}>
                        {articles}
                    </Col>
                </Row>
            </Grid>
        );
    },
    getInitialState: function() {
        ArticlesActions.loadArticles();
        return {
            articles: [],
            loading: true
        };
    },
    componentDidMount: function() {
        this.unLoadArticles = ArticlesStore.listen(this.onLoadArticles);
    },
    componentWillUnmount: function() {
        this.unLoadArticles();
    },
    onLoadArticles: function (articles) {
        console.log("Articles", "onLoadArticles", articles);
        this.setState({
            articles: articles,
            loading: false
        });
    },
});

module.exports = Articles;
