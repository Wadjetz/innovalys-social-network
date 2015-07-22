var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "erer@gmail.com",
        pass: "pass"
    }
});

module.exports.send = function (mail) {
  var Q = require('q');
  var deferred = Q.defer();
  smtpTransport.sendMail(mail, function(error, response) {
    console.log("mail", error, response);
    if(error){
      deferred.reject(error);
    } else {
      deferred.resolve(response);
    }
  });
  return deferred.promise;
};
