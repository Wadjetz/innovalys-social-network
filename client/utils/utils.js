const AppActions = require('../app/AppActions');

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

module.exports.bootstrapValidator = function (isValide) {
	if (isValide) {
		return 'success';
	} else {
		return 'error';
	}
};
