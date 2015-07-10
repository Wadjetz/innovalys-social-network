import React from 'react/addons';
import moment from 'moment';
import markdown from 'markdown';
import Router, { Link, Navigation } from 'react-router';
import Bootstrap, { Grid, Row, Col, Well, Button, Input } from 'react-bootstrap';
import ArticlesService from './ArticlesService';
import CommentsService from './CommentsService';
import AppActions from '../app/AppActions';
import i18n from '../../commun/local';
import UsersStore from '../user/UsersStore';
import Users from '../user/Users';
import CommentForm from './CommentForm';
import If from '../utils/If';

function getMe() {
  return {
    me: UsersStore.getMe(),
    connected: UsersStore.isConnected()
  };
}

export default React.createClass({
  displayName: "Article",

  mixins: [React.addons.LinkedStateMixin, Navigation],

  render: function () {
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <div className="thumbnail" key={this.state.id}>
              <h2><Link to="singleArticle" params={{slug: this.state.slug}}>{this.state.title}</Link></h2>
              <span className="label label-default">{i18n.__n('publish')} : {moment(this.state.publish).fromNow()}</span>
              <div dangerouslySetInnerHTML={{__html: markdown.markdown.toHTML(this.state.body) }}></div>
            </div>
            <div className="thumbnail">
              {this.state.comments.map(comment => {
                return (
                  <Well key={comment.id}>
                    <h5>{comment.email}</h5>
                    <p dangerouslySetInnerHTML={{__html: markdown.markdown.toHTML(comment.content) }}></p>
                    <If condition={this.state.me.me.id === comment.users_id}>
                      <Button bsStyle='danger' bsSize='xsmall' onClick={this.delete(comment)}>{i18n.__n('delete')}</Button>
                    </If>
                  </Well>
                );
              })}
              <h4>{i18n.__n('create_new_comment')}</h4>
              <CommentForm content={""} successAction={this.createComment} />
            </div>
          </Col>
          <Col xs={4}>
            <Users />
          </Col>
        </Row>
      </Grid>
    );
  },

  delete: function (comment) {
    return function (e) {
      console.log("delete comment", comment);
      CommentsService.delete(comment.id).then(result => {
        let comments = this.state.comments.filter(c => c.id !== comment.id);
        this.setState({
          comments: comments
        });
      }).fail(function (err) {
        console.log(err);
      });
    }.bind(this);
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      id: 0,
      slug: "",
      title: "",
      body: "",
      comments: [],
      publish: "",
      created: "",
      updated: "",
      users_id: 0,
      me: getMe()
    };
  },

  createComment: function (content) {
    let newComment = {
      content: content,
      news_id: this.state.id
    };
    CommentsService.create(newComment).then(result => {
      this.state.comments.push(result);
      this.setState({
        comments: this.state.comments
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.log(err);
    });
  },

  onChange: function () {
    this.setState({
      me: getMe()
    });
  },

  componentDidMount: function () {
    UsersStore.addChangeListener(this.onChange);
    let slug = this.context.router.getCurrentParams().slug;
    ArticlesService.get(slug).then(article => {
      this.setState(article);
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.log(err);
    });

    CommentsService.getAllBySlug(slug).then(comments => {
      this.setState({
        comments: comments
      });
    }).fail(err => {
      if (err.status === 401) { AppActions.unauthorized(); }
      console.log(err);
    });
  },

  componentWillUnmount: function () {
    UsersStore.removeChangeListener(this.onChange);
  },

});
