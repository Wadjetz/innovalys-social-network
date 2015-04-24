const React         = require('react');
var Reflux        = require('reflux');
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
// var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var Articles = require('./articles/Articles.jsx');
var SingleArticle = require('./articles/SingleArticle.jsx');
var CreateArticle = require('./articles/CreateArticle.jsx');
var Groups = require('./groups/Groups.jsx');
var SingleGroup = require('./groups/SingleGroup.jsx');
var CreateGroup = require('./groups/CreateGroup.jsx');
var User = require('./user/User.jsx');
var Login = require('./user/Login.jsx');
var Signup = require('./user/Signup.jsx');
var App = require('./App.jsx');
var Forbidden = require('./Forbidden.jsx');

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

Router.run(Routes, (Handler) => {
    React.render(<Handler/>, document.getElementById('wrap'));
});
