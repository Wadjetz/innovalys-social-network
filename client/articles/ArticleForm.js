import React from 'react/addons';
import Router, { Navigation } from 'react-router';
import moment from 'moment';
import _markdown, { markdown } from 'markdown';
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap';
import utils from'../../commun/utils';
import If from '../utils/If';
import i18n from '../../commun/local';

export default React.createClass({
  displayName: "ArticleForm",
  mixins: [
    React.addons.LinkedStateMixin
  ],


  render: function () {
    return (
      <Row>
        <Col xs={12} sm={6}>
          <h1>{i18n.__n('create_news')}</h1>
          <Input
            type='text'
            placeholder={i18n.__n('title')}
            label={i18n.__n('title')}
            ref='title'
            valueLink={this.linkState('title')}
          />
          <Input
            type='textarea'
            rows={20}
            label={i18n.__n('content')}
            ref='body'
            valueLink={this.linkState('body')}
          />
          <Input
            type='date'
            ref='publish'
            label={i18n.__n('publish')}
            valueLink={this.linkState('publish')}
          />
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
    let newArticle = {
      title: this.state.title,
      body: this.state.body,
      publish: this.state.publish
    };
    // TODO Validate article
    this.props.successAction(newArticle);
  },

  getInitialState: function() {
    return {
      title: this.props.article.title || "",
      body: this.props.article.body || "",
      publish: this.props.article.publish || moment().format(utils.mysqlDateFormat)
    }
  },

  propTypes: {
    successAction: React.PropTypes.func.isRequired,
    article: React.PropTypes.object
  },
});
