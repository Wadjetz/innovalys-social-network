const AppConstants  = require('./AppConstants');
const AppDispatcher = require('./AppDispatcher');

const AppActions = {
    notfound: function () {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.NOT_FOUND
        });
    },
    unauthorized: function () {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UNAUTHORIZED
        });
    },
    forbidden: function () {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.FORBIDDEN
        });
    }
};

module.exports = AppActions;

