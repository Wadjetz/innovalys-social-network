var React = require('react');
var Router = require('react-router');
var markdown = require("markdown").markdown;
var Link = Router.Link;

var ArticleView = React.createClass({
    render: function() {
        var article = this.props.article;
        console.log("ArticleView", "render", article);
        return (
            <div>
                <h2><Link to="singleArticle" params={{slug: article.slug}}>{article.title}</Link></h2>
                <div dangerouslySetInnerHTML={{__html: markdown.toHTML(article.body) }}></div>
            </div>
        );
    },
});

module.exports = ArticleView;
