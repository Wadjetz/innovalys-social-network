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
        <div className={ (err.newContent) ? 'form-group has-error' : 'form-group'}>
            <label className="control-label" htmlFor="content">{ (err.newContent) ? err.newContent : i18n.__n('content')}</label>
            <textarea className="form-control" id="content" placeholder={i18n.__n('content')} ref='newContent' valueLink={this.linkState('newContent')} />
          </div>
        <Button bsStyle='success' onClick={this.successAction}>{i18n.__n('save')}</Button>
      </div>
    );
  },

  successAction: function (e) {
    if (this.state.newContent) {
      this.props.successAction(this.state.newContent, this.props.comment);
      this.setState({
        errors: {},
        newContent: ""
      });
    } else {
      this.setState({
        errors: {
          newContent: "content can't be blanc"
        }
      });
    }
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      newContent: props.comment.content || ""
    });
  },

  getInitialState: function() {
    return {
      newContent: this.props.comment.content || "",
      errors: {}
    }
  },

  propTypes: {
    successAction: React.PropTypes.func.isRequired,
    comment: React.PropTypes.object
  },

});
