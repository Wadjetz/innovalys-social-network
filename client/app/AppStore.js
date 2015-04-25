const assign        = require('lodash/object/assign');
const AppActions    = require('./AppActions');
const AppConstants  = require('./AppConstants');
const AppDispatcher = require('./AppDispatcher');
const Store         = require('../flux/Store');
const Events        = require('../flux/Events');

const AppStore = assign(Store, {
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

module.exports = AppStore;
