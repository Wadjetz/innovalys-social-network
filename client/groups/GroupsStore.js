var Reflux = require('reflux');
var GroupsActions = require('./GroupsActions');
var GroupsApi = require('./GroupsApi');
var utils = require('../utils');
var moment = require('moment');

var GroupsStore = Reflux.createStore({
    data: {
        groups: [],
        singleGroup: {
            group: {
                id: 0,
                slug: "",
                name: "",
                access: "",
                status: "",
                type: "",
                created: moment(),
                updated: moment(),
                description: "",
                users_id: 0,
                groupUsers: [],
            },
            members: [] 
        },
        loading: true
    },
    init: function () {
        this.listenTo(GroupsActions.loadSingleGroup, this.onLoadSingleGroup);
        this.listenTo(GroupsActions.loadGroups, this.onLoadGroups);
        this.listenTo(GroupsActions.createGroup, this.onCreateGroup);
        this.listenTo(GroupsActions.joinGroup, this.onJoinGroup);
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
    },
    onJoinGroup: function (group) {
        GroupsApi.join(group, function (err, result) {
            console.debug("GroupsStore.onJoinGroup", "err", err, "result", result);
            if (err) {
                GroupsActions.joinGroup.failed(err);
            } else {
                GroupsActions.joinGroup.completed(result);
            }
        });
    }
});

module.exports = GroupsStore;
