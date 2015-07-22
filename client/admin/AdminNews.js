import React from 'react/addons';
import Router, { Link, Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col, ListGroup, ListGroupItem, Button, Input, Panel } from 'react-bootstrap';
import ArticlesService from '../articles/ArticlesService';
import AppActions from '../app/AppActions';
import i18n from '../../commun/local';

/**
 * Admin News components
 */
export default class AdminNews extends React.Component {
  /**
   * Call ArticlesService for find All news
   * @param  {object} props Props
   */
  constructor(props) {
    super(props);
    ArticlesService.findAll().then(articles => {
      this.setState({
        articles: articles
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
    });

    this.state = {
      articles: []
    };
  }

  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    let articlesView = this.state.articles.map(article => {
      return (
        <Panel key={article.id}>
          <h2>
            <Link to="singleArticle" params={{slug: article.slug}}>{article.title}</Link>
          </h2>
          <p>
            <Link className="btn btn-xs btn-primary" to="updateArticle" params={{slug: article.slug}}>{i18n.__n('update')}</Link>
            <Button bsSize='xsmall' bsStyle='danger' onClick={this.deleteNews(article)}>{i18n.__n('delete')}</Button>
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
  }

  /**
   * Delete news Handler
   * @param  {object} article Article
   * @return {Function}         Event handler with article closure
   */
  deleteNews (article) {
    return function (e) {
      ArticlesService.delete(article).then(result => {
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
  }
}
