var router = require("express").Router();
var commentsModel = require('./comments-model');
var moment = require('moment');

router.post('/', function(req, res) {
    // TODO validate data
    var user = 1; // TODO get user from session
    var comment = {
        title: req.body.title,
        body: req.body.body,
        users_id: user
    };
    console.log("comments route create", comment);
    commentsModel.create(comment, function (err, results, fields) {
        if (err) res({error: err});
        res.json({"affectedRows": results.affectedRows});
    });
});

router.get('/:articleId', function (req, res) {
    var articleId = req.params.articleId;
    var page = req.query.page;
    console.log("articleId", articleId, "page", page);
    commentsModel.findAllByArticleId(articleId, page, function (err, comment, fields) {
        if (err) res({error: err});
        else if (comment === undefined) res.json([]);
        else res.json(comment);
    });
});

module.exports = router;
