var router = require("express").Router();
var UserModel = require('../user/user-model');
var MessagesModel = require('./messages-model');
var auth = require('../config/auth');

/**
GET /chat/global/history
Get chat history
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
