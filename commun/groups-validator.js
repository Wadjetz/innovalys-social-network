var validator = require('./validator');

module.exports.groupValidate = function (group) {
  return validator(group, {
    name: { presence: true }
  });
};

module.exports.groupMessageValidate = function (messageGroup) {
  return validator(messageGroup, {
    content: { presence: true }
  });
};
