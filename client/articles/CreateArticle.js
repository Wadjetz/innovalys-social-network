import React from 'react/addons'
import Router, { Navigation } from 'react-router'
import moment from 'moment'
import _markdown, { markdown } from 'markdown'
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap'
import ArticlesService from './ArticlesService'
import utils from'../../commun/utils'
import If from '../utils/If'
import i18n from '../../commun/local'

export default React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    Navigation
  ],
  render: function() {
    let createdArticle = this.state.createdArticle;
    let createArticleError = this.state.createArticleError;
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={6}>
            <h1>{i18n.__n('create_news')}</h1>
            <If condition={this.state.createArticleError}>
              <Alert bsStyle='danger'>
                {i18n.__n('error')}
              </Alert>
            </If>
            <If condition={this.state.createArticleSuccess}>
              <Alert bsStyle='success'>
                {i18n.__n('success')}
              </Alert>
            </If>
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
            <Button bsStyle='success' onClick={this.submit}>{i18n.__n('save')}</Button>
          </Col>
          <Col xs={12} sm={6}>
            <h1>{i18n.__n('preview')}</h1>
            <h1>{this.state.title}</h1>
            <p dangerouslySetInnerHTML={{__html: markdown.toHTML(this.state.body) }}></p>
          </Col>
        </Row>
      </Grid>
    );
  },

  submit: function () {
    // TODO validate data
    let newArticle = {
      title: this.state.title,
      body: this.state.body,
      publish: this.state.publish,
      createArticleError: false,
      createArticleSuccess: false
    };
    ArticlesService.create(newArticle).then(result => {
      this.setState({
          createArticleError: false,
          createArticleSuccess: true
      });
    }, err => {
      if (err.status === 401) { this.context.router.transitionTo('login'); }
      this.setState({
        createArticleError: true,
        createArticleSuccess: false
      });
    });
  },

  getInitialState: function() {
    return {
      title: "",
      body: "",
      publish: moment().format(utils.mysqlDateFormat)
    }
  }
});
