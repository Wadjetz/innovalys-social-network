import React from 'react/addons';
import Router, { Navigation } from 'react-router';
import moment from 'moment';
import _markdown, { markdown } from 'markdown';
import Bootstrap, { Grid, Row, Col, Button, Alert } from 'react-bootstrap';
import utils from'../../commun/utils';
import If from '../utils/If';
import i18n from '../../commun/local';
import NewsValidator from '../../commun/news-validator';

export default React.createClass({
  displayName: "ArticleForm",
  mixins: [React.addons.LinkedStateMixin],

  render: function () {
    let err = this.state.errors;
    return (
      <Row className="thumbnail">
        <Col xs={12} sm={6}>
          <h1>{i18n.__n('create_news')}</h1>
          <div className={ (err.title) ? 'form-group has-error' : 'form-group'}>
            <label className="control-label" htmlFor="title">{ (err.title) ? err.title : i18n.__n('title')}</label>
            <input type="text" className="form-control" id="title" placeholder={i18n.__n('title')} ref='title' valueLink={this.linkState('title')} />
          </div>
          <div className={ (err.body) ? 'form-group has-error' : 'form-group'}>
            <label className="control-label" htmlFor="content">{ (err.body) ? err.body : i18n.__n('body')}</label>
            <textarea className="form-control" id="content" placeholder={i18n.__n('content')} ref='body' valueLink={this.linkState('body')} rows={20} />
          </div>
          <div className={ (err.publish) ? 'form-group has-error' : 'form-group'}>
            <label className="control-label" htmlFor="content">{ (err.publish) ? err.publish : i18n.__n('publish')}</label>
            <input type="date" className="form-control" id="publish" placeholder={i18n.__n('publish')} ref='publish' valueLink={this.linkState('publish')} />
          </div>
          <Button bsStyle='success' onClick={this.successAction}>{i18n.__n('save')}</Button>
        </Col>
        <Col xs={12} sm={6}>
          <h1>{i18n.__n('preview')}</h1>
          <h1>{this.state.title}</h1>
          <p dangerouslySetInnerHTML={{__html: markdown.toHTML(this.state.body) }}></p>
        </Col>
      </Row>
    );
  },

  successAction: function (e) {
    NewsValidator.newsValidate({
      title: this.state.title,
      body: this.state.body,
      publish: this.state.publish
    }).then(art => {
      this.setState({
        errors: {}
      });
      this.props.successAction(art);
    }).fail(err => {
      this.setState({
        errors: err
      });
    });
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      title: props.article.title || "",
      body: props.article.body || "",
      publish: moment(props.article.publish).format(utils.mysqlDateFormat) || moment().format(utils.mysqlDateFormat)
    });
  },

  getInitialState: function() {
    return {
      title: this.props.article.title || "",
      body: this.props.article.body || "",
      publish: moment(this.props.article.publish).format(utils.mysqlDateFormat) || moment().format(utils.mysqlDateFormat),
      errors: {}
    }
  },

  propTypes: {
    successAction: React.PropTypes.func.isRequired,
    article: React.PropTypes.object
  },
});
