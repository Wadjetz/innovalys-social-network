var validate = require("validate.js");
var moment = require('moment');
validate.moment = moment;

module.exports.validateComment = function (newComment, callback) {
    // TODO Configure validator
    console.log("comment-validator", "newComment", newComment);
    var constraints = {
        title: {
            presence: true,
        },
        body: {
            presence: true,
        },
        news_id: {
            presence: true,
        }
    };
    callback(validate(newComment, constraints));
};
