var AppActions = require('./AppActions');

module.exports.handleErrors = function (err, res, callback) {
	if (err) {
		if (err.status === 401) {
			AppActions.unauthorized();
		}
		if (err.status === 403) {
			AppActions.forbidden();
		}
	} else {
		callback(err, res.body);
	}
};
