var Reflux = require('reflux');
var GroupsActions = require('./GroupsActions');
var GroupsApi = require('./GroupsApi');
var utils = require('../utils');

var GroupsStore = Reflux.createStore({
    data: {
        groups: [],
        singleGroup: null,
        loading: true
    },
    init: function () {
        this.listenTo(GroupsActions.loadSingleGroup, this.onLoadSingleGroup);
        this.listenTo(GroupsActions.loadGroups, this.onLoadGroups);
        this.listenTo(GroupsActions.createGroup, this.onCreateGroup);
    },
    getInitialState: function () {
        return this.data;
    },
    onLoadSingleGroup: function (slug) {
        GroupsApi.get(slug, function (err, group) {
            this.data.singleGroup = group;
            this.data.loading = false;
            this.trigger(this.data);
        }.bind(this));
    },
    onLoadGroups: function () {
        GroupsApi.getAll(function (err, groups) {
            this.data.groups = groups;
            this.data.loading = false;
            this.trigger(this.data);
        }.bind(this));
    },
    onCreateGroup: function (group) {
        GroupsApi.create(group, function (err, result) {
            GroupsActions.createGroup.completed(err, result);
        });
    }
});

module.exports = GroupsStore;
