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

module.exports.slug = function(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};
