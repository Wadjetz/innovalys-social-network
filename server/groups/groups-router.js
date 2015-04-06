var router   = require("express").Router();
var moment   = require('moment');
var validate = require("validate.js");

var auth        = require('../config/auth');
var GroupsModel = require('./groups-model');
var UserModel   = require('../user/user-model');

validate.moment = moment;

router.get('/', function (req, res) {
    var page = req.query.page || 0;
    GroupsModel.findAll(page, function (err, groups) {
        console.log("groups", groups);
        res.json(groups);
    });
});

function groupsValidator(req, res, next) {
    var newGroup = {
        name: req.body.name,
        description: req.body.description || "",
        status: req.body.status || 'open',
        access: req.body.access || 'private',
        type: req.body.type || 'project'
    };

    // TOTO Move this in commun module
    var constraints = {
        name: {
            presence: true,
        }
    };
    var validatorRes = validate(newGroup, constraints);
    if (validatorRes === undefined) {
        req._new_group = newGroup;
        next();
    } else {
        res.status(400).json({
            error: true,
            message: validatorRes
        });
    }
}

router.post('/', groupsValidator, auth.withUser, function (req, res) {
    var user = req.$user;
    var group = req._new_group;
    group.users_id = user.id;
    GroupsModel.create(group, function (err, result) {
        console.log("err", err, "result", result);
        res.json(result);
    });
});

module.exports = router;
