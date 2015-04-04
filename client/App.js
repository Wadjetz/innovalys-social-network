var React         = require('react');
var Reflux        = require('reflux');
var Router        = require('react-router');
var Link          = Router.Link;

var RouteHandler  = Router.RouteHandler;

var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var CollapsableNav = require('react-bootstrap/lib/CollapsableNav');
var NavItem = require('react-bootstrap/lib/NavItem');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var AppActions = require('./AppActions');
var AppStore = require('./AppStore');

var If = require('./If');

var App = React.createClass({
    mixins: [
        Reflux.listenTo(AppActions.forbidden, 'onForbidden'),
        Reflux.listenTo(AppActions.unauthorized, 'onUnauthorized'),
        Router.Navigation
    ],
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
                                <li><Link to="login">Login</Link></li>
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
    },
    getInitialState: function() {
        return {
            loading: true
        };
    },
    onUnauthorized: function () {
        console.log("App", "unauthorized");
        this.context.router.transitionTo('login');
    },
    onForbidden: function () {
        console.log("App", "Forbidden");
        this.context.router.transitionTo('forbidden');
    }
});

module.exports = App;
