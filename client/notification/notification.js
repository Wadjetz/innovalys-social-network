/**
 * Created by Damien on 24/04/2015.
 */

var CronJob = require('cron').CronJob;


new CronJob('0 33 19 * * *',
    function(){
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        new Notification('Notification title', {
            body: "Hey there! You've been notified!"
        });
    },
    null,
    true,
    'Europe/Paris'
);

