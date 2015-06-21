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

module.exports.createConversation = function (target) {
  return Qajax({
    url: BASE_URL + '/chat/conversations',
    method: 'POST',
    data: target
  })
  .then(Qajax.filterSuccess)
  .then(Qajax.toJSON)
}
