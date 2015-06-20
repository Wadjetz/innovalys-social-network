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
import Chat from '../chat/Chat'
import AppActions from './AppActions'
import AppStore from './AppStore'
import UsersActions from '../user/UsersActions'
import UsersStore from '../user/UsersStore'
import Events from '../flux/Events'
import If from '../utils/If'
import i18n, { locales, changeLocale } from '../../commun/local'

function getMe() {
  return {
    me: UsersStore.getMe(),
    connected: UsersStore.isConnected(),
    locale: "en"
  }
}

export default React.createClass({
  displayName: "App",
  mixins: [ Router.Navigation ],
  render: function() {
    let me = this.state.me;
    return (
      <div>
        <Navbar brand={i18n.__n('brand')} toggleNavKey={0} fluid>
          <CollapsableNav eventKey={1}>
            <If condition={this.state.connected}>
              <Nav navbar>
                  <li><Link to="articles">{i18n.__n('news')}</Link></li>
                  <li><Link to="groups">{i18n.__n('groups')}</Link></li>
                  <If condition={me.role === "admin" || me.role === "rh"}>
                    <DropdownButton eventKey={4} title='RH' navItem={true}>
                      <li><Link to="createArticle">{i18n.__n('create_news')}</Link></li>
                      <li><Link to="signup">{i18n.__n('create_user')}</Link></li>
                    </DropdownButton>
                  </If>
              </Nav>
            </If>
            <Nav navbar right>
              <If condition={this.state.connected}>
                <DropdownButton eventKey={5} title={me.first_name} navItem={true}>
                  <li><Link to="user">{i18n.__n('profile')}</Link></li>
                  <li><a href="/users/logout">{i18n.__n('logout')}</a></li>
                </DropdownButton>
              </If>
              <DropdownButton eventKey={6} title={i18n.getLocale().toUpperCase()} navItem={true}>
                {locales.map((locale, i) => {
                  return (
                    <li key={i}>
                        <a href="#" onClick={this.changeLocal(locale)}>{locale.toUpperCase()}</a>
                    </li>
                  );
                })}
              </DropdownButton>
            </Nav>
          </CollapsableNav>
        </Navbar>
        <RouteHandler />
        <If condition={this.state.connected}>
          <Chat />
        </If>
      </div>
    );
  },
  changeLocal: function (locale) {
    return function () {
      changeLocale(locale);
      this.setState({
        locale: locale
      });
    }.bind(this);
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
