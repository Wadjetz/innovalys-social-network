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
var Groupes = require('./groupes/Groupes');
var Auth = require('./auth/Auth');
var User = require('./user/User');


var App = React.createClass({
    render: function() {
        return (
            <div>
            <h1>Hello</h1>
            <ul>
                <li><Link to="articles">Articles</Link></li>
                <li><Link to="auth">auth</Link></li>
                <li><Link to="groupes">groupes</Link></li>
                <li><Link to="user">user</Link></li>
            </ul>
            <RouteHandler />
            </div>
        );
    }
});


var Routes = (
    <Route handler={App} path="/">
        <Route name="articles" handler={Articles} path="/articles" />
        <Route name="singleArticle" handler={SingleArticle} path="/articles/:slug" />
        <Route name="auth" handler={Auth} path="/auth" />
        <Route name="groupes" handler={Groupes} path="/groupes" />
        <Route name="user" handler={User} path="/user" />
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.body);
});
