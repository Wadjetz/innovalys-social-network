import Dispatcher from '../flux/Dispatcher'
import assign     from 'lodash/object/assign'

const AppDispatcher = assign(Dispatcher.prototype, {
    handleViewAction: function (action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

export default AppDispatcher;
