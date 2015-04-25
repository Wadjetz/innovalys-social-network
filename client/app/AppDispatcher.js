const Dispatcher = require('../flux/Dispatcher');
const assign     = require('lodash/object/assign');

const AppDispatcher = assign(Dispatcher.prototype, {
    handleViewAction: function (action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

module.exports = AppDispatcher;
