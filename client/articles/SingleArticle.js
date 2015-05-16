const React           = require('react');
const isEmpty         = require('lodash/lang/isempty');
const ArticlesActions = require('./ArticlesActions');
const ArticleView     = require('./ArticleView');
const ArticlesStore   = require('./ArticlesStore');
const CreateComment   = require('../comments/CreateComment');
const CommentsStore   = require('../comments/CommentsStore');
const CommentView     = require('../comments/CommentView');
const Grid            = require('react-bootstrap/lib/Grid');
const Row             = require('react-bootstrap/lib/Row');
const Col             = require('react-bootstrap/lib/Col');
const If              = require('../utils/If');

function getSingleArticle () {
    return {
        singleArticle: ArticlesStore.getSingleArticle(),
        loading: ArticlesStore.getLoading(),
        comments: CommentsStore.getComments()
    };
}

const SingleArticle = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        let singleArticle = this.state.singleArticle;
        let loading = this.state.loading;
        let comments = this.state.comments.map(comment => <CommentView comment={comment} key={comment.id} />);
        //console.log("SingleArticle.render", this.state);
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <If condition={!isEmpty(singleArticle)}>
                            <ArticleView article={singleArticle} />
                        </If>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h3>Comments</h3>
                        {comments}
                    </Col>
                    <Col xs={12}>
                        <If condition={!isEmpty(singleArticle)}>
                            <CreateComment article={singleArticle} />
                        </If>
                    </Col>
                </Row>
            </Grid>
        );
    },
    getInitialState: function () {
        return getSingleArticle();
    },
    onChange: function () {
        this.setState(getSingleArticle());
    },
    componentDidMount: function () {
        ArticlesActions.loadSingleArticle(this.context.router.getCurrentParams().slug);
        ArticlesStore.addChangeListener(this.onChange);
        CommentsStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        ArticlesStore.removeChangeListener(this.onChange);
        CommentsStore.removeChangeListener(this.onChange);
    }
});

module.exports = SingleArticle;
