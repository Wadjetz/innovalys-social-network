var m = require('mithril');
var moment = require('moment');

module.exports.getDateFormat = function (date) {
    return moment(date, "YYYY-MM-DD");
}

module.exports.col = function (xs, sm, md, lg, body) {
    return m('.col-xs-'+xs + '.col-sm-'+sm + '.col-md-'+md + '.col-lg-'+lg, body);
};

module.exports.row = function (body) {
    return m('.row', body);
};
