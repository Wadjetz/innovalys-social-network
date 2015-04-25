const React           = require('react');
const Grid            = require('react-bootstrap/lib/Grid');
const Row             = require('react-bootstrap/lib/Row');
const Col             = require('react-bootstrap/lib/Col');
const Loader          = require('halogen').GridLoader;
const ArticlesStore   = require('./ArticlesStore');
const ArticlesActions = require('./ArticlesActions');
const ArticleView     = require('./ArticleView');
const Events          = require('../flux/Events');
const If              = require('../utils/If');
const Chat            = require('../chat/Chat');

function getArticles () {
    return {
        articles: ArticlesStore.getArticles()
    };
}

const Articles = React.createClass({
    render: function() {
        //console.debug("Articles.render", this.state, ArticlesStore.getArticles());
        let articles = this.state.articles.map((article, i) => (<ArticleView article={article} key={article.id} />) );
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
    getInitialState: function () {
        return getArticles();
    },
    onChange: function () {
        this.setState(getArticles());
    },
    componentDidMount: function () {
        ArticlesActions.loadArticles();
        ArticlesStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        ArticlesStore.removeChangeListener(this.onChange);
    }
});

module.exports = Articles;
