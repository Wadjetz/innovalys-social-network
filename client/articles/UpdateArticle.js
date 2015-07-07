import React from 'react/addons';
import Router, { Navigation } from 'react-router';
import moment from 'moment';
import _ from 'lodash';
import _markdown, { markdown } from 'markdown';
import Bootstrap, { Grid, Row, Col, Input, Button, Alert } from 'react-bootstrap';
import ArticlesService from './ArticlesService';
import utils from'../../commun/utils';
import If from '../utils/If';
import i18n from '../../commun/local';
import ArticleForm from './ArticleForm';

export default React.createClass({
  displayName: "UpdateArticle",
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
          <Col xs={12}>
            <h1>{i18n.__n('update_news')}</h1>
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
          </Col>
        </Row>
        <ArticleForm
          article={this.state.article}
          successAction={this.successAction}
        />
      </Grid>
    );
  },

  successAction: function (article) {
    ArticlesService.update(this.state.article.id, article).then(result => {
      article.id = this.state.article.id;
      this.setState({
          article: article,
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
      article: {},
      createArticleError: false,
      createArticleSuccess: false
    };
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount: function () {
    let slug = this.context.router.getCurrentParams().slug;
    ArticlesService.get(slug).then(article => {
      this.setState({
        article: article
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.log(err);
    });
  }

});
