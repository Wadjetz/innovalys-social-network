var router = require("express").Router();
var UserModel = require('../user/user-model');
var messagesModel = require('./messages-model');
var auth = require('../config/auth');

router.get('/global/history', auth.withUser, function (req, res) {
    // TODO implement pagination
    messagesModel.getAll(0, function (error, messages) {
        // TODO handle errors
        res.json(messages);
    });
});


module.exports = router;