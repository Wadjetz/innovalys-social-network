import _ from'lodash'
import EventEmitter from'events'
import Events from'./Events'

const Store = _.assign(EventEmitter.prototype, {
  emitEvent: function(event) {
    if (event) this.emit(event);
    else throw new Error("For emit, event required");
  },
  addEventListener: function(event, callback) {
    if (event && callback) this.on(event, callback);
    else throw new Error("For addListener, event and callback required");
  },
  removeEventListener: function(event, callback) {
    if (event && callback) this.removeListener(event, callback);
    else throw new Error("for removeListener, event and callback required");
  },
  emitChange: function() {
    this.emit(Events.CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(Events.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Events.CHANGE_EVENT, callback);
  },
});

export default Store;
