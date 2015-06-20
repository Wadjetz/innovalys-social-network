import _ from 'lodash'
import Dispatcher from '../flux/Dispatcher'

export default _.assign(Dispatcher.prototype, {
  handleViewAction: function (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});
