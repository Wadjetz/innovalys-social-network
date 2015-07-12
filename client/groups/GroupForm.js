import React from 'react/addons';
import Router, { Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col, ListGroup, ListGroupItem, Button, Input } from 'react-bootstrap';
import GroupsService from './GroupsService';
import GroupsValidator from '../../commun/groups-validator';
import i18n from '../../commun/local';

export default React.createClass({
  displayName: "GroupForm",
  mixins: [React.addons.LinkedStateMixin, Navigation],

  render: function () {
    let err = this.state.errors;
    return (
      <div>
        <div className={ (err.name) ? 'form-group has-error' : 'form-group'}>
          <label className="control-label" htmlFor="name">{ (err.name) ? err.name : i18n.__n('name')}</label>
          <input type="text" className="form-control" id="name" placeholder={i18n.__n('name')} ref='name' valueLink={this.linkState('name')} />
        </div>
        <Input type='select' label={i18n.__n('accesses')} placeholder={i18n.__n('accesses')} valueLink={this.linkState('access')}>
          {this.state.accesses.map((access, i) => {
            if (access === this.state.access) {
              return <option selected value={access} key={i}>{access}</option>
            } else {
              return <option value={access} key={i}>{access}</option>
            }
          })}
        </Input>
        <Input type='select' label={i18n.__n('types')} placeholder={i18n.__n('types')} valueLink={this.linkState('type')}>
          {this.state.types.map((type, i) => {
            if (type === this.state.type) {
              return <option selected value={type} key={i}>{type}</option>
            } else {
              return <option value={type} key={i}>{type}</option>
            }
          })}
        </Input>
        <div className={ (err.description) ? 'form-group has-error' : 'form-group'}>
          <label className="control-label" htmlFor="description">{ (err.description) ? err.description : i18n.__n('description')}</label>
          <textarea className="form-control" id="description" placeholder={i18n.__n('description')} ref='description' valueLink={this.linkState('description')} />
        </div>
        <Button bsStyle='success' onClick={this.successAction}>{i18n.__n('save')}</Button>
      </div>
    );
  },

  successAction: function (e) {
    GroupsValidator.groupValidate({
      name: this.state.name,
      description: this.state.description,
      access: this.state.access,
      type: this.state.type
    }).then(group => {
      this.setState({ errors: {} });
      this.props.successAction(group);
    }).fail(err => {
      this.setState({ errors: err });
    })
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      name: props.group.name || "",
      access: props.group.access || "",
      type: props.group.type || "",
      description: props.group.description || ""
    });
  },

  getInitialState: function() {
    return {
      name: this.props.group.name || "",
      accesses: [],
      access: this.props.group.access || "",
      types: [],
      type: this.props.group.type || "",
      description: this.props.group.description || "",
      errors: {}
    }
  },

  propTypes: {
    successAction: React.PropTypes.func.isRequired,
    group: React.PropTypes.object
  },

  componentDidMount: function () {
    GroupsService.getGroupsTypes().then(types => {
      this.setState({
        accesses: types.accesses,
        types: types.types
      })
    }, err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });
  },
});

