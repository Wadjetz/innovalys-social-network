/**
 * Created by Damien on 24/04/2015.
 */

var cron = require('cron');



if (Notification.permission !== "granted")
    Notification.requestPermission();


var notification = new Notification('Notification title', {
    body: "Hey there! You've been notified!"
});