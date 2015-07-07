import React from 'react/addons';
import Router, { Link, Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col, ListGroup, ListGroupItem, Button, Input, Panel } from 'react-bootstrap';
import ArticlesService from '../articles/ArticlesService';
import AppActions from '../app/AppActions';
import i18n from '../../commun/local';

export default React.createClass({
  displayName: "AdminNews",
  render: function () {
    let articlesView = this.state.articles.map(article => {
      return (
        <Panel key={article.id}>
          <h2>
            <Link to="singleArticle" params={{slug: article.slug}}>{article.title}</Link>
          </h2>
          <p>
            <Link className="btn btn-default" to="createArticle">{i18n.__n('update')}</Link>
            <Button bsStyle='danger' onClick={this.deleteNews(article)}>{i18n.__n('delete')}</Button>
          </p>
        </Panel>
      );
    });
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            {articlesView}
          </Col>
        </Row>
      </Grid>
    );
  },

  deleteNews: function (article) {
    return function (e) {
      ArticlesService.delete(article).then(result => {
        console.log(result);
        if(result.delete > 0) {
          let articles = this.state.articles.filter(a => a.id !== article.id);
          this.setState({
            articles: articles
          });
        } else {
          console.log("Not deleted");
        }
      }).fail(function (err) {
        console.log(err);
      });
    }.bind(this);
  },

  getInitialState: function () {
    return {
      articles: []
    };
  },

  componentDidMount: function () {
    ArticlesService.findAll().then(articles => {
      console.log(articles);
      this.setState({
        articles: articles
      });
    }, err => {
      if (err.status === 401) { AppActions.unauthorized(); }
    });
  }

});
