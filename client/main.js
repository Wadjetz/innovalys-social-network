const React         = require('react');
const Router        = require('react-router');
const RouteHandler  = Router.RouteHandler;
const Route         = Router.Route;
const DefaultRoute  = Router.DefaultRoute;
const Link          = Router.Link;
const Articles      = require('./articles/Articles');
const SingleArticle = require('./articles/SingleArticle');
const CreateArticle = require('./articles/CreateArticle');
const Groups        = require('./groups/Groups');
const SingleGroup   = require('./groups/SingleGroup');
const CreateGroup   = require('./groups/CreateGroup');
const User          = require('./user/User');
const Login         = require('./user/Login');
const Signup        = require('./user/Signup');
const App           = require('./app/App');
const Forbidden     = require('./app/Forbidden');
const ChatStore     = require('./chat/ChatStore');

ChatStore.connect();

const Routes = (
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
