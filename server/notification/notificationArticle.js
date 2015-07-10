/**
 * Created by Damien on 08/07/2015.
 */

var userModle = require("../user/user-model");
var config = require('../config/config');



module.exports = function(io){
    io.on("connection", function(socket){
       socket.on("article", function(msg){
           console.log(msg);
           socket.emit('new_article', msg);
       });
    });
};