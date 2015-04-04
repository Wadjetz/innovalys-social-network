var React         = require('react');
var Reflux        = require('reflux');
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
// var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var CollapsableNav = require('react-bootstrap/lib/CollapsableNav');
var NavItem = require('react-bootstrap/lib/NavItem');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var Articles = require('./articles/Articles');
var SingleArticle = require('./articles/SingleArticle');
var CreateArticle = require('./articles/CreateArticle');
var Groupes = require('./groupes/Groupes');
var SingleGroupe = require('./groupes/SingleGroupe');
var Auth = require('./auth/Auth');
var User = require('./user/User');
var Signup = require('./user/Signup');


var App = React.createClass({
    render: function() {
        return (
            <div>
            <Navbar brand='Innovalys' toggleNavKey={0} fluid>
                <CollapsableNav eventKey={0}> {/* This is the eventKey referenced */}
                    <Nav navbar>
                        <li><Link to="articles">Articles</Link></li>
                        <li><Link to="groupes">Groupes</Link></li>
                        <DropdownButton eventKey={3} title='Options'>
                            <li><Link to="createArticle">Create Article</Link></li>
                            <li><Link to="auth">Auth (Login, Signup, Logout)</Link></li>
                            <li><Link to="signup">Signup</Link></li>
                            <li><Link to="singleGroupe" params={{slug: 'toto'}}>single groupes</Link></li>
                        </DropdownButton>
                    </Nav>
                    <Nav navbar right>
                        <li><Link to="user">User</Link></li>
                    </Nav>
                </CollapsableNav>
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
        <Route name="signup" handler={Signup} path="/signup" />
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('wrap'));
});
