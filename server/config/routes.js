var User = require('../user/user-model');
var NewsRouter = require('../news/news-router');
var CommentsRouter = require('../comments/comments-router');
var UserRouter = require('../user/user-router');
var GroupsRouter = require('../groups/groups-router');

module.exports = function (app, express) {
    app.use('/users', UserRouter);
    app.use('/news', NewsRouter);
    app.use('/comments', CommentsRouter);
    app.use('/groups', GroupsRouter);
};
