import _ from 'lodash'
import AppActions from './AppActions'
import AppConstants from './AppConstants'
import AppDispatcher from './AppDispatcher'
import Store from '../flux/Store'
import Events from '../flux/Events'

const AppStore = _.assign(Store, {
  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {
      case AppConstants.UNAUTHORIZED:
        AppStore.emitEvent(Events.UNAUTHORIZED_EVENT);
        break;
    }
    return true;
  })
});

export default AppStore;
