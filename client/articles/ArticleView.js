const React    = require('react');
const Router   = require('react-router');
const moment   = require('moment');
const markdown = require("markdown").markdown;
const Link     = Router.Link;

const ArticleView = React.createClass({
    render: function() {
        let article = this.props.article;
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
