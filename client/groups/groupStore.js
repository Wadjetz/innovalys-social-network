/**
 * Created by Damien on 12/07/2015.
 */

import _ from 'lodash';

import Store from '../flux/Store';
var notification = require("../notification/notification");

const socket = window.io(document.location.host);

var _GroupData = {
    name:"",
    slug:""
};


var groupStore = _.assign(Store, {
    connect: function (){

        console.log("connect");
        socket.on("connect", function () {
            console.log("connect");
        });

        socket.on('update_groups', function (msg) {
            console.log("update_groups", msg);
            notification.groupUpdate(msg);

        });
    },
    disconnect:function(){
        socket.disconnect();
    },

    groupUpdate:function(title, slug){
        _GroupData.name = title;
        _GroupData.slug = slug;
        socket.emit("update_groups", _GroupData);
    }
});

export default groupStore;