var router = require("express").Router();
var newsModel = require('./news-model');
var moment = require('moment');

router.post('/', function(req, res) {
    // TODO validate data
    // TODO validate date moment.isValid()
    var news = {
        title: req.body.title,
        body: req.body.body,
        publish: moment(req.body.publish, "YYYY-MM-DD HH:MM:SS").format("YYYY-MM-DD HH:MM:SS")
    }
    console.log("news route create", news)
    newsModel.create(news, function (err, results, fields) {
        if (err) res({error: err});
        res.json({"affectedRows": results.affectedRows});
    });
});

router.get('/', function (req, res) {
    newsModel.findAllNews(0, function (err, news, fields) {
        if (err) res({error: err});
        res.json(news);
    })
})

module.exports = router;

