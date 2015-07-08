var validator = require('./validator');

module.exports.newsValidate = function (news) {
  return validator(news, {
    title: { presence: true },
    body: { presence: true },
    publish: {
      presence: true,
      datetime: true
    }
  });
};
