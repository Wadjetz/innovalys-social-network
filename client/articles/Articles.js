import React from 'react';
import moment from 'moment';
import markdown from 'markdown';
import Router, { Link, Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col } from 'react-bootstrap';
import ArticlesService from './ArticlesService';
import AppActions from '../app/AppActions';
import UsersActions from '../user/UsersActions';
import Users from '../user/Users';
import i18n from '../../commun/local';

export default React.createClass({
  mixins: [Navigation],
  render: function () {
    let articles = this.state.articles;
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            {articles.map((article, i) => {
              return (
                <div className="thumbnail article" key={article.id}>
                  <h2><Link to="singleArticle" params={{slug: article.slug}}>{article.title}</Link></h2>
                  <span className="label label-default">{i18n.__n('publish')} : {moment(article.publish).fromNow()}</span>
                  <div dangerouslySetInnerHTML={{__html: markdown.markdown.toHTML(article.body) }}></div>
                </div>
              );
            })}
          </Col>
          <Col xs={4}>
            <Users />
          </Col>
        </Row>
      </Grid>
    );
  },

  getInitialState: function () {
    return {
      articles: []
    };
  },

  componentDidMount: function () {
    UsersActions.loadMe();
    ArticlesService.findAll().then(articles => {
      this.setState({
        articles: articles
      });
    }, err => {
      if (err.status === 401) { AppActions.unauthorized(); }
    });
  }

});
