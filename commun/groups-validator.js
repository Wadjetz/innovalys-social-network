var validator = require('./validator');

module.exports.groupValidate = function (group) {
  return validator(group, {
    name: { presence: true }
  });
};
