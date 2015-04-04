var Reflux = require('reflux');

var AppActions = Reflux.createActions({
    "notfound": {},
    "unauthorized": {},
    "forbidden": {}
});

module.exports = AppActions;
