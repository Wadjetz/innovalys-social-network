/** Chat Router
 * @module server/chat/chat-router
 */
var router = require("express").Router();
var MessagesModel = require('./messages-model');
var auth = require('../config/auth');

/**
 * Get chat history
 * GET /chat/global/history
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function getAllChatMessagesAction (req, res) {
  // TODO implement pagination
  MessagesModel.getAll(0)
    .then(function (messages) {
      res.json(messages);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}
router.get('/global/history', auth.withUser, getAllChatMessagesAction);

module.exports = router;
