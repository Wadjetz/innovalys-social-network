var router   = require("express").Router();
var moment   = require('moment');
var validate = require("validate.js");
var async    = require('async');
var utils    = require('../../commun/utils');
var auth         = require('../config/auth');
var GroupsModel  = require('./groups-model');
var MembersModel = require('./members-model');
var UserModel    = require('../user/user-model');
var MessagesModel = require('./messages-model');

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
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({
                    error: "Already exist"
                });
            } else {
                res.status(500).json({
                    error: err
                });
            }
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(500).json({
                    error: err
                });
            }
        }
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

/**
Message group validator
*/
var messageGroupValidator = function (req, res, next) {
    var newMessage = {
        content: req.body.content
    };

    var constraints = {
        content: {
            presence: true,
        }
    };

    var validatorRes = validate(newMessage, constraints);
    if (validatorRes === undefined) {
        req._new_message = newMessage;
        next();
    } else {
        res.status(400).json({
            error: true,
            message: validatorRes
        });
    }
}

/**
Create a message group
*/
var createMessageGroup = function (req, res) {
    var user = req.$user;
    var slug = req.params.slug;
    var newMessage = req._new_message;
    GroupsModel.findOneBySlug(slug, function (err, group) {
        console.log(err, group);
        if (err) {
            res.status(404)
        } else {
            newMessage.users_id = user.id;
            newMessage.groups_id = group.id;
            MessagesModel.create(newMessage, function (err, message) {
                console.log(err, message);
                if (err) {
                    console.error(err);
                } else if (message.length > 0) {
                    res.json(message[0]);
                } else {
                    res.status(500);
                }
            });
        }
    });
};

router.post('/messages/:slug', auth.withUser, messageGroupValidator, createMessageGroup);

var getMessagesGroups = function (req, res) {
    var user = req.$user;
    var slug = req.params.slug;
    MessagesModel.findAllByGroupSlug(slug, 0, function (err, messages) {
        console.log(err, messages);
        res.json(messages);
    });
};

router.get('/messages/:slug', auth.withUser, getMessagesGroups);

var getGroupsTypes = function (req, res) {
    var status = GroupsModel.groupsStatus;
    var access = GroupsModel.groupsAccess;
    var types = GroupsModel.groupsTypes;
    res.json({
        status: [
            status.open,
            status.close
        ],
        accesses: [
            access.public,
            access.private
        ],
        types: [
            types.project,
            types.discussion,
            types.other
        ]
    });
}

router.get('/types', auth.withUser, getGroupsTypes);

/**
Upload files for groups
*/
var uploadFile = function (req, res) {
    var user = req.$user;
    var slug = req.params.slug;
    var file = req.files.file;
    if (file) {
        console.log("file", file);
        var groupFile = {
            originalname: file.originalname,
            mimetype: file.mimetype,
            path: file.path,
            extension: file.extension,
            size: file.size
        }
        res.json(groupFile);
    } else {
        res.status(400).json({
            error: "file required"
        });
    }
};

router.post('/upload/:slug', auth.withUser, uploadFile);

module.exports = router;
