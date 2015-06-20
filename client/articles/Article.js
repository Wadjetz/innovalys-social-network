import React from 'react/addons'
import moment from 'moment'
import markdown from 'markdown'
import Router, { Link, Navigation } from 'react-router'
import Bootstrap, {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Input
} from 'react-bootstrap'
import ArticlesService from './ArticlesService'
import CommentsService from './CommentsService'
import Chat from '../chat/Chat'
import i18n from '../../commun/local'


export default React.createClass({
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
              {this.state.comments.map(comment => {
                return (
                  <ListGroup key={comment.id}>
                    <ListGroupItem header={comment.email}>
                      <span dangerouslySetInnerHTML={{__html: markdown.markdown.toHTML(comment.content) }}></span>
                    </ListGroupItem>
                  </ListGroup>
                );
              })}
              <h4>{i18n.__n('create_new_comment')}</h4>
              <Input
                  type='textarea'
                  placeholder={i18n.__n('content')}
                  label={i18n.__n('content')}
                  ref='content'
                  valueLink={this.linkState('newComment')}
              />
              <Button bsStyle='success' onClick={this.createComment}>{i18n.__n('save')}</Button>
            </div>
          </Col>
          <Col xs={4}>
            <Chat />
          </Col>
        </Row>
      </Grid>
    );
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
      newComment: "",
      newCommentError: false,
      newCommentSuccess: false
    }
  },

  createComment: function () {
    if (this.state.newComment !== "") {
      let newComment = {
        content: this.state.newComment,
        news_id: this.state.id
      }
      CommentsService.create(newComment).then(result => {
        this.state.comments.push(result);
        this.setState({
          newCommentSuccess: true,
          newCommentError: false,
          comments: this.state.comments,
          newComment: ""
        });
      }, err => {
        if (err.status === 401) { this.context.router.transitionTo('login'); }
        this.setState({
          newCommentSuccess: false,
          newCommentError: true
        });
      })
    } else {
      this.setState({
        newCommentSuccess: false,
        newCommentError: true
      });
    }
  },

  componentDidMount: function () {
    let slug = this.context.router.getCurrentParams().slug
    ArticlesService.get(slug).then(article => {
      this.setState(article);
    }, err => {
      console.error(err);
      if (err.status === 401) { this.context.router.transitionTo('login'); }
    });
  }

});
