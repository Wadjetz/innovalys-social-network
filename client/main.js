import React from 'react'
import Router, { RouteHandler, Route, DefaultRoute, Link } from 'react-router'
import Articles from './articles/Articles'
import Article from './articles/Article'
import CreateArticle from './articles/CreateArticle'
import Groups from './groups/Groups'
import Group from './groups/Group'
import User from './user/User'
import Login from './user/Login'
import Signup from './user/Signup'
import App from './app/App'
import Forbidden from './app/Forbidden'
import ChatStore from './chat/ChatStore'

ChatStore.connect();

const Routes = (
  <Route handler={App} path="/">
    <Route name="articles" handler={Articles} path="/articles" />
    <Route name="singleArticle" handler={Article} path="/articles/:slug" />
    <Route name="createArticle" handler={CreateArticle} path="/create/article" />
    <Route name="groups" handler={Groups} path="/groups" />
    <Route name="singleGroup" handler={Group} path="/groups/:slug" />
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
