import assign        from 'lodash/object/assign'
import AppActions    from './AppActions'
import AppConstants  from './AppConstants'
import AppDispatcher from './AppDispatcher'
import Store         from '../flux/Store'
import Events        from '../flux/Events'

export default assign(Store, {
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
