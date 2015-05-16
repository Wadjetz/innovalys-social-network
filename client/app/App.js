const React          = require('react');
const Router         = require('react-router');
const Link           = Router.Link;
const RouteHandler   = Router.RouteHandler;
const Navbar         = require('react-bootstrap/lib/Navbar');
const Nav            = require('react-bootstrap/lib/Nav');
const DropdownButton = require('react-bootstrap/lib/DropdownButton');
const CollapsableNav = require('react-bootstrap/lib/CollapsableNav');
const NavItem        = require('react-bootstrap/lib/NavItem');
const MenuItem       = require('react-bootstrap/lib/MenuItem');
const AppActions     = require('./AppActions');
const AppStore       = require('./AppStore');
const UsersActions   = require('../user/UsersActions');
const UsersStore     = require('../user/UsersStore');
const Events         = require('../flux/Events');
const If             = require('../utils/If');

function getMe() {
    return {
        me: UsersStore.getMe()
    }
}

const App = React.createClass({
    mixins: [ Router.Navigation ],
    render: function() {
        //console.debug("App.render", this.state);
        let me = this.state.me;
        return (
            <div>
                <Navbar brand='Innovalys' toggleNavKey={0} fluid>
                    <CollapsableNav eventKey={0}> {/* This is the eventKey referenced */}
                        <Nav navbar>
                            <li><Link to="articles">Articles</Link></li>
                            <li><Link to="groups">Groups</Link></li>
                            <If condition={me.role === "admin" || me.role === "chef"}>
                                <DropdownButton eventKey={3} title='Chef de groupe' navItem={true}>
                                    <li><Link to="createGroup">Create Group</Link></li>
                                </DropdownButton>
                            </If>
                            <If condition={me.role === "admin" || me.role === "rh"}>
                                <DropdownButton eventKey={4} title='RH' navItem={true}>
                                    <li><Link to="createArticle">Create Article</Link></li>
                                    <li><Link to="signup">Create User</Link></li>
                                </DropdownButton>
                            </If>
                        </Nav>
                        <Nav navbar right>
                            <li><Link to="user">{me.first_name}</Link></li>
                        </Nav>
                    </CollapsableNav>
                </Navbar>
                <RouteHandler />
            </div>
        );
    },
    getInitialState: function () {
        UsersActions.loadMe();
        return getMe();
    },
    onChange: function () {
        this.setState(getMe());
    },
    componentDidMount: function () {
        UsersStore.addChangeListener(this.onChange);
        AppStore.addEventListener(Events.UNAUTHORIZED_EVENT, this.onUnauthorized);
    },
    componentWillUnmount: function () {
        UsersStore.removeChangeListener(this.onChange);
        AppStore.removeEventListener(Events.UNAUTHORIZED_EVENT, this.onUnauthorized);
    },
    onUnauthorized: function () {
        this.context.router.transitionTo('login');
    },
    onForbidden: function () {
        this.context.router.transitionTo('forbidden');
    }
});

module.exports = App;
