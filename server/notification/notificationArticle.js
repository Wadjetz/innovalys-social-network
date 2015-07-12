/**
 * Created by Damien on 08/07/2015.
 */

var UserModel = require("../user/user-model");
var config = require('../config/config');



module.exports = function(io){
    io.on("connection", function(socket){
        console.log("connect");
        socket.on("connect", function(){
            UserModel.connect(socket.request.$user.id).then(function (result) {
                console.log("connect ok", socket.request.$user.email);
            }).fail(function (err) {
                console.log("connect err", socket.request.$user.email);
            });
        });
       socket.on("new_article", function(msg){
           console.log(msg);
           socket.emit('new_article', msg);
       });
    });
};