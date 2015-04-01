var React = require('react');
var Reflux = require('reflux');
var ArticlesStore = require('./ArticlesStore');
var ArticlesActions = require('./ArticlesActions');
var ArticleView = require('./ArticleView');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var Articles = React.createClass({
    mixins: [
        Reflux.ListenerMixin
    ],
    getInitialState: function() {
        ArticlesActions.loadArticles()
        return {
            articles: []
        };
    },
    componentDidMount: function() {
        this.unLoadArticles = ArticlesStore.listen(this.onLoadArticles);
    },
    componentWillUnmount: function() {
        this.unLoadArticles();
    },
    render: function() {
        var articles = this.state.articles.map(function (article) {
            return (
                <ArticleView article={article} key={article.id} />
            );
        });
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        {articles}
                    </Col>
                </Row>
            </Grid>
        );
    },
    onLoadArticles: function (articles) {
        console.log("Articles", "onLoadArticles", articles);
        this.setState({
            articles: articles
        });
    }
});

module.exports = Articles;
