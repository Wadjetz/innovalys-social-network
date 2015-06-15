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
var GroupsFilesModel = require('./groups-files-model');

validate.moment = moment;
/**
GET /groups
Get all groups
*/
var getGroupsRoute = function (req, res) {
  var user = req.$user;
  var page = req.query.page || 0;
  GroupsModel.findAll(page).then(function (groups) {
    res.json(groups);
  }).fail(function (err) {
    res.status(400).json(err);
  });
}
router.get('/', auth.withUser, getGroupsRoute);

var findMyGroups = function (req, res) {
    var user = req.$user;
    GroupsModel.findMyGroups(user).then(function (groups) {
      res.json(groups);
    }).fail(function (err) {
      res.status(400).json(err);
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
  GroupsModel.create(group)
    .then(function (id) {
      return GroupsModel.findOneById(id);
    })
    .then(function (group) {
      res.json(group);
    })
    .fail(function (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).json({
            error: "Already exist"
        });
      } else {
        res.status(500).json(err);
      }
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
        async.waterfall([
            function (callback) {
                GroupsModel.findOneBySlug(slug, function (err, group) {
                    callback(err, group);
                });
            },
            function (group, callback) {
                var groupFile = {
                    name: file.originalname,
                    mimetype: file.mimetype,
                    extension: file.extension,
                    size: file.size,
                    path: file.path,
                    groups_id: group.id,
                    users_id: user.id
                };
                GroupsFilesModel.create(groupFile, function (createErr, createRes) {
                    callback(createErr, createRes);
                });
            }
        ], function (err, result) {
            console.log("waterfall.res", err, result);
            if (err) {
                res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        });
    } else {
        res.status(400).json({
            error: "file required"
        });
    }
};

router.post('/upload/:slug', auth.withUser, uploadFile);

/**
Find all files group by slug
*/
var findAllByGroupSlug = function (req, res) {
    var user = req.$user;
    var slug = req.params.slug;
    GroupsFilesModel.findAllByGroupSlug(slug, function (error, result) {
        if (error) {
            res.status(400).json({
                error: error
            })
        } else {
            res.json(result);
        }
    });
};
router.get('/files/:slug', auth.withUser, findAllByGroupSlug);


module.exports = router;
