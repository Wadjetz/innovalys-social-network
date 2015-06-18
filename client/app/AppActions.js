import AppConstants  from './AppConstants'
import AppDispatcher from './AppDispatcher'

export default {
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
