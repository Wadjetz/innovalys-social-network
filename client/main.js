var React         = require('react/addons');
var Reflux        = require('reflux');
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
// var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var Articles = require('./articles/Articles');
var SingleArticle = require('./articles/SingleArticle');


var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Hello <Link to="articles">Articles</Link></h1>
                <RouteHandler />
            </div>
        );
    }
});


var Routes = (
    <Route handler={App} path="/">
        <Route name="articles" handler={Articles} path="/articles" />
        <Route name="singleArticle" handler={SingleArticle} path="/articles/:slug" />
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.body);
});
