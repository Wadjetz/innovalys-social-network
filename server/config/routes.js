var User = require('../user/user-model');
var NewsRouter = require('../news/news-router');
var CommentsRouter = require('../comments/comments-router');
var UserRouter = require('../user/user-router');
var GroupsRouter = require('../groups/groups-router');
var GroupsMembersRouter = require('../groups/members-router');
var GroupsMessagesRouter = require('../groups/messages-router');
var GroupsFilesRouter = require('../groups/files-router');
var ChatRouter = require('../chat/chat-router');
var ConversationsRouter = require('../chat/conversations-router');

module.exports = function (app, express) {
    app.use('/users', UserRouter);
    app.use('/news', NewsRouter);
    app.use('/comments', CommentsRouter);
    app.use('/groups', GroupsRouter);
    app.use('/groups/members', GroupsMembersRouter);
    app.use('/groups/messages', GroupsMessagesRouter);
    app.use('/groups/files', GroupsFilesRouter);
    app.use('/chat', ChatRouter);
    app.use('/chat/conversations', ConversationsRouter)
};
