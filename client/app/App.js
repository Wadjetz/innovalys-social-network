import React from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import Bootstrap, { Navbar, Nav, DropdownButton, CollapsableNav, NavItem, MenuItem } from 'react-bootstrap';
import AppActions from './AppActions';
import AppStore from './AppStore';
import ChatStore from '../chat/ChatStore';
import UsersActions from '../user/UsersActions';
import UsersStore from '../user/UsersStore';
import Events from '../flux/Events';
import Chat from '../chat/Chat';
import If from '../utils/If';
import i18n, { locales, changeLocale } from '../../commun/local';

function getMe() {
  return {
    me: UsersStore.getMe(),
    connected: UsersStore.isConnected(),
    locale: "en"
  };
}

export default React.createClass({
  displayName: "App",
  mixins: [ Router.Navigation ],
  render: function() {
    let me = this.state.me;
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">{i18n.__n('brand')}</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <If condition={this.state.connected}>
                <div>
                  <ul className="nav navbar-nav">
                    <li><Link to="articles">{i18n.__n('news')}</Link></li>
                    <li><Link to="groups">{i18n.__n('groups')}</Link></li>
                    <If condition={me.role === "admin" || me.role === "rh"}>
                      <DropdownButton eventKey={0} title='RH' navItem={true}>
                        <li><Link to="createArticle">{i18n.__n('create_news')}</Link></li>
                        <li><Link to="signup">{i18n.__n('create_user')}</Link></li>
                        <li><Link to="adminNews">{i18n.__n('admin_news')}</Link></li>
                        <li><Link to="adminUsers">{i18n.__n('admin_users')}</Link></li>
                      </DropdownButton>
                    </If>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <DropdownButton eventKey={1} title={me.first_name} navItem={true}>
                      <li><Link to="user">{i18n.__n('profile')}</Link></li>
                      <li><a href="/users/logout">{i18n.__n('logout')}</a></li>
                    </DropdownButton>
                  </ul>
                </div>
              </If>
            </div>
          </div>
        </nav>
        <RouteHandler />
        <If condition={this.state.connected}>
          <Chat />
        </If>
      </div>
    );
  },
  changeLocal: function (locale) {
    return function (e) {
      e.preventDefault();
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
    // ChatStore.disconnect();
    // ChatStore.connect();
    UsersStore.addChangeListener(this.onChange);
    AppStore.addEventListener(Events.UNAUTHORIZED_EVENT, this.onUnauthorized);
  },
  componentWillUnmount: function () {
    // ChatStore.disconnect();
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
