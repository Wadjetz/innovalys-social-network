/**
 * Created by Damien on 12/07/2015.
 */


var userModle = require("../user/user-model");
var config = require('../config/config');
var groupModel = require("../groups/groups-model");
var membersModel = require("../groups/members-model");

module.exports = function(io){
    io.on("connection", function(socket){
        console.log("connect");
        socket.on("connect", function(){
        });
        socket.on("update_groups", function(msg){
            console.log(msg);
            membersModel.findAllByGroupSlug(msg.slug).then(function(group){
                socket.emit('update_groups', msg, group);
            }).fail(function(err){
                socket.emit('error', err);
            });
            socket.emit('update_groups', msg);
        });
    });
};