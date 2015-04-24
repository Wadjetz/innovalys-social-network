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
var UsersActions = require('./user/UsersActions');
var UsersStore = require('./user/UsersStore');

var If = require('./If.jsx');

var App = React.createClass({
    mixins: [
        Reflux.connect(UsersStore),
        Reflux.listenTo(AppActions.forbidden, 'onForbidden'),
        Reflux.listenTo(AppActions.unauthorized, 'onUnauthorized'),
        Router.Navigation
    ],
    render: function() {
        console.debug("App.render", "me", this.state.me);
        return (
            <div>
                <Navbar brand='Innovalys' toggleNavKey={0} fluid>
                    <CollapsableNav eventKey={0}> {/* This is the eventKey referenced */}
                        <Nav navbar>
                            <li><Link to="articles">Articles</Link></li>
                            <li><Link to="groups">Groups</Link></li>
                            <If condition={this.state.me.role === "admin" || this.state.me.role === "chef"}>
                                <DropdownButton eventKey={3} title='Chef de groupe' navItem={true}>
                                    <li><Link to="createGroup">Create Group</Link></li>
                                </DropdownButton>
                            </If>
                            <If condition={this.state.me.role === "admin" || this.state.me.role === "rh"}>
                                <DropdownButton eventKey={4} title='RH' navItem={true}>
                                    <li><Link to="createArticle">Create Article</Link></li>
                                    <li><Link to="signup">Create User</Link></li>
                                </DropdownButton>
                            </If>
                        </Nav>
                        <Nav navbar right>
                            <li><Link to="user">{ (this.state.me) ? this.state.me.first_name : "User" }</Link></li>
                        </Nav>
                    </CollapsableNav>
                </Navbar>
                <RouteHandler />
            </div>
        );
    },     
    componentWillMount: function () {
        UsersActions.loadMe();
    },
    onUnauthorized: function () {
        this.context.router.transitionTo('login');
    },
    onForbidden: function () {
        this.context.router.transitionTo('forbidden');
    }
});

module.exports = App;
