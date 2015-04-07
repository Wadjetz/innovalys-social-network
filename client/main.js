var React         = require('react');
var Reflux        = require('reflux');
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
// var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var Articles = require('./articles/Articles');
var SingleArticle = require('./articles/SingleArticle');
var CreateArticle = require('./articles/CreateArticle');
var Groups = require('./groups/Groups');
var SingleGroup = require('./groups/SingleGroup');
var CreateGroup = require('./groups/CreateGroup');
var User = require('./user/User');
var Login = require('./user/Login');
var Signup = require('./user/Signup');
var App = require('./App');
var Forbidden = require('./Forbidden');

var Routes = (
    <Route handler={App} path="/">
        <Route name="articles" handler={Articles} path="/articles" />
        <Route name="createArticle" handler={CreateArticle} path="/create/article" />
        <Route name="singleArticle" handler={SingleArticle} path="/articles/:slug" />
        <Route name="groups" handler={Groups} path="/groups" />
        <Route name="singleGroup" handler={SingleGroup} path="/groups/:slug" />
        <Route name="createGroup" handler={CreateGroup} path="create/group" />
        <Route name="user" handler={User} path="/user" />
        <Route name="signup" handler={Signup} path="/signup" />
        <Route name="login" handler={Login} path="/login" />
        <Route name="forbidden" handler={Forbidden} path="/forbidden" />
        <DefaultRoute handler={Articles} />
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('wrap'));
});
