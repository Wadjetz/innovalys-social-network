var validator = require('./validator');

module.exports.userValidate = function (user) {
  return validator(user, {
    email: { email: true, presence: true },
    first_name: { presence: true },
    last_name: { presence: true },
    birthday_date: { presence: true },
    adress: { presence: true },
    function: { presence: true },
    description: { presence: true },
    arrival_date: { presence: true }
  });
};

module.exports.loginsValidate = function (logins) {
  return validator(logins, {
    email: { presence: true, email: true },
    password: { presence: true }
  });
};

module.exports.changePasswordValidate = function (passwords) {
  return validator(passwords, {
    current_password: { presence: true },
    new_password: { presence: true }
  });
};
