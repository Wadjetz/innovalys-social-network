/** Document File Router
 * @module server/groups/files-router
 */
var fs = require('fs');
var router   = require("express").Router();
var moment   = require('moment');
var validate = require("validate.js");
var log      = require('log4js').getLogger();
var auth         = require('../config/auth');
var GroupsModel  = require('./groups-model');
var GroupsFilesModel = require('./files-model');
validate.moment = moment;

/**
 * Upload files for groups
 * POST /groups/files/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
var uploadFile = function (req, res) {
  var user = req.$user;
  var slug = req.params.slug;
  var file = req.files.file;
  if (file) {
    log.debug(req.files);
    GroupsModel.findOneBySlug(slug).then(function (group) {
      var groupFile = {
        name: file.originalname,
        mimetype: file.mimetype,
        extension: file.extension,
        size: file.size,
        path: file.path,
        groups_id: group.id,
        users_id: user.id
      };
      GroupsFilesModel.create(groupFile).then(function (createdId) {
        return GroupsFilesModel.findById(createdId);
      }).then(function (groupfile) {
        res.json(groupfile);
      }).fail(function (err) {
        res.status(500).json(err);
      });
    }).fail(function (err) {
      res.status(404).json(err);
    });
  } else {
    res.status(400).json({
      error: "file required"
    });
  }
};
router.post('/:slug', auth.withUser, uploadFile);

/**
 * Find all files group by slug
 * GET /groups/files/:slug
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function getAllGroupBySlugAction (req, res) {
  var slug = req.params.slug;
  GroupsFilesModel.findAllByGroupSlug(slug)
    .then(function (file) {
      res.json(file);
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
}
router.get('/:slug', auth.withUser, getAllGroupBySlugAction);

/**
 * Download Group File
 * GET /groups/files/download/:slug/:id
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function downloadFileAction(req, res) {
  var user = req.$user;
  var id = req.params.id;
  console.log('downloadFileAction', id);
  GroupsFilesModel.findById(id).then(function (file) {
    res.download(file.path);
  }).fail(function (err) {
    res.status(404).json(err);
  });
}
router.get('/download/:slug/:id', auth.inGroups, downloadFileAction);

/**
 * Delete Group File
 * GET /groups/files/download/:slug/:id
 * @param  {request} req request
 * @param  {result} res result
 * @return {void}
 */
function deleteFileAction(req, res) {
  var id = req.params.id;
  console.log('deleteFileAction', id);
  GroupsFilesModel.findById(id).then(function (file) {
    GroupsFilesModel.delete(id).then(function (result) {
      fs.unlink(file.path, function (result) {
        res.json(result);
      });
    }).fail(function (err) {
      res.status(404).json(err);
    });
  }).fail(function (err) {
    res.status(404).json(err);
  });
}
router.delete('/:slug/:id', auth.inGroups, deleteFileAction);

module.exports = router;
