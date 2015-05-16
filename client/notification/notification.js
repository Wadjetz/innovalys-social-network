/**
 * Created by Damien on 15/05/2015.
 */

module.exports.displayNotification = function(title, body){
    new Notification(title,{
        body: body
    });
};