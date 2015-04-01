var React         = require('react/addons');
var Reflux        = require('reflux');
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
// var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var bootstrap = require('react-bootstrap');
var Navbar = bootstrap.Navbar;
var Nav = bootstrap.Nav;
var DropdownButton = bootstrap.DropdownButton;
var CollapsableNav = bootstrap.CollapsableNav;

var Articles = require('./articles/Articles');
var SingleArticle = require('./articles/SingleArticle');
var CreateArticle = require('./articles/CreateArticle');
var Groupes = require('./groupes/Groupes');
var SingleGroupe = require('./groupes/SingleGroupe');
var Auth = require('./auth/Auth');
var User = require('./user/User');


var App = React.createClass({
    render: function() {
        return (
            <div>
            <Navbar brand='Innovalys' fluid>
                <Nav>
                    <li><Link to="articles">Articles</Link></li>
                    <li><Link to="createArticle">createArticle</Link></li>
                    <li><Link to="singleArticle" params={{slug: 'toto'}}>Articles Toto</Link></li>
                    <li><Link to="auth">auth</Link></li>
                    <li><Link to="groupes">groupes</Link></li>
                    <li><Link to="singleGroupe" params={{slug: 'toto'}}> single groupes</Link></li>
                    <li><Link to="user">user</Link></li>
                </Nav>
                <DropdownButton eventKey={3} title='Dropdown'>
                    <li><Link to="articles">Articles</Link></li>
                    <li><Link to="createArticle">createArticle</Link></li>
                    <li><Link to="singleArticle" params={{slug: 'toto'}}>Articles Toto</Link></li>
                    <li><Link to="auth">auth</Link></li>
                    <li><Link to="groupes">groupes</Link></li>
                    <li><Link to="singleGroupe" params={{slug: 'toto'}}> single groupes</Link></li>
                    <li><Link to="user">user</Link></li>
                </DropdownButton>
            </Navbar>
            <RouteHandler />
            </div>
        );
    }
});


var Routes = (
    <Route handler={App} path="/">
        <Route name="articles" handler={Articles} path="/articles" />
        <Route name="createArticle" handler={CreateArticle} path="/create/article" />
        <Route name="singleArticle" handler={SingleArticle} path="/articles/:slug" />
        <Route name="auth" handler={Auth} path="/auth" />
        <Route name="groupes" handler={Groupes} path="/groupes" />
        <Route name="singleGroupe" handler={SingleGroupe} path="/groupes/:slug" />
        <Route name="user" handler={User} path="/user" />
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('wrap'));
});
