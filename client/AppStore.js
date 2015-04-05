var Reflux = require('reflux');
var AppActions = require('./AppActions');

var AppStore = Reflux.createStore({
    init: function () {
        //console.log("AppStore", "init");
        this.listenTo(AppActions.unauthorized, this.onUnauthorized);
        this.listenTo(AppActions.forbidden, this.onForbidden);
    },
    onUnauthorized: function () {
        this.trigger();
    },
    onForbidden: function () {
        this.trigger();
    }
});

module.exports = AppStore;
