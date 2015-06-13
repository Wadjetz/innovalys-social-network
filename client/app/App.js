import React from 'react'
import Router, { Link, RouteHandler } from 'react-router'
import Bootstrap, {
    Navbar,
    Nav,
    DropdownButton,
    CollapsableNav,
    NavItem,
    MenuItem
} from 'react-bootstrap'
import AppActions from './AppActions'
import AppStore from './AppStore'
import UsersActions from '../user/UsersActions'
import UsersStore from '../user/UsersStore'
import Events from '../flux/Events'
import If from '../utils/If'

function getMe() {
    return {
        me: UsersStore.getMe()
    }
}

const App = React.createClass({
    mixins: [ Router.Navigation ],
    render: function() {
        let me = this.state.me;
        return (
            <div>
                <Navbar brand='Innovalys' toggleNavKey={0} fluid>
                    <CollapsableNav eventKey={1}>
                        <Nav navbar>
                            <li><Link to="articles">Articles</Link></li>
                            <li><Link to="groups">Groups</Link></li>
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
