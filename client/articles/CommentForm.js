import React from 'react/addons';
import moment from 'moment';
import markdown from 'markdown';
import Bootstrap, { Grid, Row, Col, ListGroup, ListGroupItem, Button, Input } from 'react-bootstrap';
import i18n from '../../commun/local';

export default React.createClass({
  displayName: "CommentForm",
  
  mixins: [React.addons.LinkedStateMixin],

  render: function () {
    let err = this.state.errors;
    return (
      <div>
        <div className={ (err.content) ? 'form-group has-error' : 'form-group'}>
            <label className="control-label" htmlFor="content">{ (err.content) ? err.content : i18n.__n('content')}</label>
            <textarea className="form-control" id="content" placeholder={i18n.__n('content')} ref='content' valueLink={this.linkState('content')} />
          </div>
        <Button bsStyle='success' onClick={this.successAction}>{i18n.__n('save')}</Button>
      </div>
    );
  },

  successAction: function (e) {
    if (this.state.content) {
      this.props.successAction(this.state.content);
      this.setState({
        errors: {},
        content: ""
      });
    } else {
      this.setState({
        errors: {
          content: "content can't be blanc"
        }
      });
    }
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      content: props.content || ""
    });
  },

  getInitialState: function() {
    return {
      content: this.props.content || "",
      errors: {}
    }
  },

  propTypes: {
    successAction: React.PropTypes.func.isRequired,
    comment: React.PropTypes.object
  },

});
