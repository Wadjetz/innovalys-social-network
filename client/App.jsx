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

var If = require('./If');

var App = React.createClass({
    mixins: [
        Reflux.connect(UsersStore),
        Reflux.listenTo(AppActions.forbidden, 'onForbidden'),
        Reflux.listenTo(AppActions.unauthorized, 'onUnauthorized'),
        Router.Navigation
    ],
    render: function() {
        //console.log("App.render", "me", this.state.me);
        return (
            <div>
                <Navbar brand='Innovalys' toggleNavKey={0} fluid>
                    <CollapsableNav eventKey={0}> {/* This is the eventKey referenced */}
                        <Nav navbar>
                            <li><Link to="articles">Articles</Link></li>
                            <DropdownButton eventKey={3} title='Groups'>
                                <li><Link to="groups">Groups</Link></li>
                                <li><Link to="createGroup">Create Group</Link></li>
                            </DropdownButton>
                            <DropdownButton eventKey={4} title='RH'>
                                <li><Link to="createArticle">Create Article</Link></li>
                                <li><Link to="signup">Create User</Link></li>
                            </DropdownButton>
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
    onUnauthorized: function () {
        this.context.router.transitionTo('login');
    },
    onForbidden: function () {
        this.context.router.transitionTo('forbidden');
    }
});

module.exports = App;
