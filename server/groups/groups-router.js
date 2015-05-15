var router   = require("express").Router();
var moment   = require('moment');
var validate = require("validate.js");
var async    = require('async');
var utils    = require('../../commun/utils');
var auth         = require('../config/auth');
var GroupsModel  = require('./groups-model');
var MembersModel = require('./members-model');
var UserModel    = require('../user/user-model');

validate.moment = moment;
/**
GET /groups
Get groups
*/
var getGroupsRoute = function (req, res) {
    var user = req.$user;
    var page = req.query.page || 0;
    GroupsModel.findAll(page, function (err, groups) {
        console.log("groups", groups);
        res.json(groups);
    });
}
router.get('/', auth.withUser, getGroupsRoute);

var findMyGroups = function (req, res) {
    var user = req.$user;
    GroupsModel.findMyGroups(user, function (err, groups) {
        res.json(groups);
    });
}

router.get('/my-groups', auth.withUser, findMyGroups);

router.get('/by-slug/:slug', auth.withUser, function (req, res) {
    var user = req.$user;
    var slug = req.params.slug;
    async.waterfall([
        function (callback) {
            GroupsModel.findOneBySlug(slug, function (err, group) {
                console.log(slug, err, group);
                callback(err, group);
            });
        },
        function (group, callback) {
            if (group) {
                MembersModel.findByStatus(group.id, "pending", function (err, members) {
                    console.log(err, members);
                    callback(err, {
                        group: group,
                        members: members
                    });
                });
            } else {
                callback(null, null, null);
            }
        }
    ], function (err, result) {
        if (err) {
            res.sendStatus(500).json(err);
        } else if (result) {
            res.json(result);
        } else {
            res.sendStatus(404)
        }
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
    group.slug = utils.slug(group.name);
    group.users_id = user.id;
    GroupsModel.create(group, function (err, result) {
        console.log("err", err, "result", result);
        res.json(result);
    });
});

router.post('/members/join/:slug', auth.withUser, function (req, res) {
    var user = req.$user;
    var slug = req.params.slug;
    async.waterfall([
        function (callback) {
            GroupsModel.findOneBySlug(slug, function (err, group) {
                console.log("findOneBySlug", "slug="+slug, "err", err, "group", group);
                if (group) {
                    callback(err, group);
                } else {
                    callback({error: "Group not found"});
                }
            });
        },
        function (group, callback) {
            MembersModel.create(user.id, group.id, function (createErr, createRes) {
                console.log("create", createErr, createRes);
                callback(createErr, {
                    group: group,
                    createRes: createRes
                });
            });
        }
    ], function (err, result) {
        if (err) {
            res.status(400).json(err);
        } else if (result) {
            res.json(result);
        } else {
            res.status(404);
        }
    });
});

router.get('/members/:slug', auth.withUser, function (req, res) {
    var user = req.$user;
    var slug = req.params.slug;
    GroupsModel.findOneBySlug(slug, function (err, group) {
        // TODO handel errors
        MembersModel.findByStatus(group.id, "pending", function (findErr, findRes) {
            // TODO handel errors
            res.json(findRes);
        });
    });
});

module.exports = router;
