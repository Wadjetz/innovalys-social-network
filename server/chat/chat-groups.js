var log = require('log4js').getLogger();
var MessagesModel = require('./messages-model');
var GroupsModel = require('../groups/groups-model');

module.exports = function(io, socket) {
  GroupsModel
    .findMyGroups(socket.request.$user)
    .then(function (groups) {
      groups.map(function (group) {
        log.debug(group);
        socket.join(group.slug);
      });
    })
    .fail(function (err) {
      log.error("Chat groups", err);
    });

}
