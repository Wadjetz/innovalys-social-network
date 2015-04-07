var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var markdown = require("markdown").markdown;
var Link = Router.Link;

var ArticleView = React.createClass({
    render: function() {
        var article = this.props.article;
        console.log("ArticleView", "render", article);
        return (
            <div className="thumbnail">
                <h2><Link to="singleArticle" params={{slug: article.slug}}>{article.title}</Link></h2>
                <span className="label label-default">Publish : {moment(article.publish).fromNow()}</span>
                <div dangerouslySetInnerHTML={{__html: markdown.toHTML(article.body) }}></div>
            </div>
        );
    },
});

module.exports = ArticleView;
