import _ from 'lodash';
import { UNAUTHORIZED } from './AppActions';
import AppDispatcher from './AppDispatcher';
import Store from '../flux/Store';
import Events from '../flux/Events';

const AppStore = _.assign(Store, {
  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType) {
      case UNAUTHORIZED:
        AppStore.emitEvent(Events.UNAUTHORIZED_EVENT);
        break;
    }
    return true;
  })
});

export default AppStore;
