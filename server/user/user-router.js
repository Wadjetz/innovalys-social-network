var router = require("express").Router();
var passwordHash = require('password-hash');
var validate = require("validate.js");
var generatePassword = require('password-generator');
var moment = require('moment');
var async = require('async');
var fs = require('fs');
var utils = require('../../commun/utils');
var userValidator = require('../../commun/user-validator');
var UserModel = require('./user-model');
var RoomsModel = require('../chat/rooms-model');
var auth = require('../config/auth');

router.get('/', auth.withUser, function (req, res) {
  var user = req.$user;
  UserModel.findAll(user).then(function (users) {
    res.json(users);
  }).fail(function (err) {
    res.status(500).json(err);
  });
});

function signupValidator(req, res, next) {
  var newUser = {
    email: req.body.email,
    role: req.body.role,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday_date: req.body.birthday_date,
    adress: req.body.adress,
    function: req.body.function,
    description: req.body.description,
    arrival_date: req.body.arrival_date
  };

  userValidator.signupValidator(newUser, function(validatorRes) {
    if (validatorRes === undefined) {
      req._new_user = newUser;
      next();
    } else {
      res.status(400).json({
        error: validatorRes
      });
    }
  });
}

router.post('/signup', signupValidator, function(req, res) {
  var newUser = req._new_user;
  var generatedPassword = generatePassword(8, false);
  newUser.password = passwordHash.generate(generatedPassword);
  UserModel.create(newUser).then(function(id) {
    res.status(201).json({
      access: {
        email: newUser.email,
        password: generatedPassword
      }
    });
    RoomsModel.findOneByName('global_chat').then(function (room) {
      return RoomsModel.addUser({
        rooms_id: room.id,
        users_id: id
      });
    }).then(function (addTargetInsertedId) {
      console.log("signup RoomsModel.addUser", addTargetInsertedId);
    }).fail(function (err) {
      console.log("signup RoomsModel.findOneByName", err);
    });
  }).fail(function(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
          error: "Already exist"
      });
    } else {
      res.status(400).json(err);
    }
  });
});

function loginValidator(req, res, next) {
  var login = {
    email: req.body.email,
    password: req.body.password
  };

  var validatorRes = validate(login, userValidator.loginConstraints);
  if (validatorRes === undefined) {
    req._login = login;
    next();
  } else {
    res.status(400).json({
      error: "Login ou password invalide",
      errors: validatorRes
    });
  }
}

var jsonError = {
  error: "Login ou password invalide"
};

router.post('/login', loginValidator, function(req, res, next) {
  var login = req._login;
  UserModel.findOneByEmail(login.email.toLowerCase())
    .then(function(user) {
      if (passwordHash.verify(login.password, user.password)) {
        req.session.email = user.email;
        req.session.isLogged = true;
        res.json({
          message: "Hello"
        });
      } else {
        res.status(400).json(jsonError);
      }
    })
    .fail(function(err) {
      res.status(400).json(jsonError);
    });
});

function changePasswordValidator(req, res, next) {
  var newPassword = {
    current_password: req.body.current_password,
    new_password: req.body.new_password
  }

  var newPasswordConstraints = {
    current_password: {
      presence: true
    },
    new_password: {
      presence: true,
    }
  };

  var validatorRes = validate(newPassword, newPasswordConstraints);
  if (validatorRes === undefined) {
    req._newPassword = newPassword;
    next();
  } else {
    res.status(400).json(validatorRes);
  }
}

router.put('/password', changePasswordValidator, auth.withUser, function (req, res) {
  var user = req.$user;
  var newPassword = req._newPassword;
  if (passwordHash.verify(newPassword.current_password, user.password)) {
    UserModel
      .changePassword(user, { password: passwordHash.generate(newPassword.new_password) })
      .then(function (result) {
        res.json({
          updated: result
        });
      })
      .fail(function (err) {
        console.log(err);
        res.status(400).json(jsonError);
      });
  } else {
    res.status(400).json(jsonError);
  }
});

router.put('/profile', auth.withUser, function (req, res) {
  var user = req.$user;
  var file = req.files.file;
  fs.rename(__dirname + '/../../' + file.path, './public/img/profiles/', function(err){
    console.log('done renaming', __dirname);
    if (err) res.json(err);
    else res.json({
      "message": "cool",
      "pwd": __dirname
    });
  });
});

router.get('/roles', function(req, res) {
  var roles = UserModel.roles;
  var result = [];
  for (key in roles) {
    result.push(roles[key]);
  }
  res.json(result);
});

router.get('/status-connection', function(req, res) {
  var statusConnection = UserModel.status_connection;
  var result = [];
  for (key in statusConnection) {
    result.push(statusConnection[key]);
  }
  res.json(result);
});

router.get('/me', auth.withUser, function(req, res) {
  var user = req.$user;
  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    birthday_date: user.birthday_date,
    status_profile: user.status_profile,
    status_connection: user.status_connection,
    function: user.function,
    description: user.description,
    arrival_date: user.arrival_date,
    last_connection: user.last_connection
  });
});

router.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
    console.log(err);
  })
  res.redirect('/');
});

module.exports = router;
