import _ from 'lodash';
import Dispatcher from '../flux/Dispatcher';

export default _.assign(Dispatcher.prototype, {
  handleChatAction: function (action) {
    this.dispatch({
      source: 'CHAT_ACTION',
      action: action
    });
  }
});
