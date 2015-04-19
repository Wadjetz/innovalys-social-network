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

var Chat = require('../chat/Chat');

var Articles = React.createClass({
    mixins: [
        Reflux.connect(ArticlesStore)
    ],
    render: function() {
        var articles = this.state.articles.map(function (article, i) {
            return (
                <ArticleView article={article} key={i} />
            );
        });
        return (
            <Grid>
                <If condition={this.state.loading}>
                    <Row>
                        <Col xs={2} mdOffset={5}>
                            <Loader color="#26A65B" size="16px" margin="4px"/>
                        </Col>
                    </Row>
                </If>
                <Row>
                    <Col xs={8}>
                        {articles}
                    </Col>
                    <Col xs={4}>
                        <Chat />
                    </Col>
                </Row>
            </Grid>
        );
    },
    componentWillMount: function() {
        ArticlesActions.loadArticles();
    }
});

module.exports = Articles;
