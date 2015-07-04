import Qajax from 'qajax'
const BASE_URL = document.location.origin;

module.exports.getAllMessages = function (page) {
  return Qajax({
    url: BASE_URL + '/chat/global/history',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};

module.exports.createRoom = function (target) {
  return Qajax({
    url: BASE_URL + '/chat/rooms',
    method: 'POST',
    data: target
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};

module.exports.getRooms = function () {
  return Qajax({
    url: BASE_URL + '/chat/rooms',
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};

module.exports.getRoomById = function (roomId) {
  return Qajax({
    url: BASE_URL + '/chat/rooms/' + roomId,
    method: 'GET'
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
};
