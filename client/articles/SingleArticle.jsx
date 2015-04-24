var React  = require('react');
var Reflux = require('reflux');

var ArticlesActions = require('./ArticlesActions');
var ArticleView     = require('./ArticleView.jsx');
var ArticlesStore   = require('./ArticlesStore');

var Comments      = require('../comments/Comments.jsx');
var CreateComment = require('../comments/CreateComment.jsx');

var Grid = require('react-bootstrap/lib/Grid');
var Row  = require('react-bootstrap/lib/Row');
var Col  = require('react-bootstrap/lib/Col');

var Loader = require('halogen').RingLoader;
var If     = require('../If.jsx');

var SingleArticle = React.createClass({
    mixins: [
        Reflux.connect(ArticlesStore)
    ],
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        return (
            <Grid>
                <If condition={this.state.loading}>
                    <Row>
                        <Col xs={2} mdOffset={5}>
                            <Loader color="#26A65B" size="150px" margin="4px"/>
                        </Col>
                    </Row>
                </If>
                <Row>
                    <Col xs={12}>
                        <If condition={this.state.singleArticle !== null}>
                            <ArticleView article={this.state.singleArticle} />
                        </If>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <If condition={this.state.singleArticle !== null}>
                            <Comments article={this.state.singleArticle} />
                        </If>
                    </Col>
                    <Col xs={12}>
                        <If condition={this.state.singleArticle !== null}>
                            <CreateComment article={this.state.singleArticle} />
                        </If>
                    </Col>
                </Row>

            </Grid>
        );
    },
    componentWillMount: function() {
        ArticlesActions.loadSingleArticle(this.context.router.getCurrentParams().slug);
    }
});

module.exports = SingleArticle;
