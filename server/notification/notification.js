/**
 * Created by Damien on 24/04/2015.
 *
 * Les <?> vont être modifier ce sont les valeurs qui changeron quand une notification s'affichera
 */

var CronJob = require('cron').CronJob;
var db = requires("../config/database");


if (Notification.permission !== "granted")
    Notification.requestPermission();

//notification article
new CronJob('0 0 13 * * *',
    function(){

        new Notification('Nouveaux article', {
            body: "<?> articles à été mis en ligne!"
        });
    },
    null,
    true,
    'Europe/Paris'
);


//notification message
new CronJob('* * * * * *',
    function(){
        new Notification('Nouveau message', {
           body: "Vous avez un nouveau message de <?>"
        });
    },
    null,
    true,
    'Europe/Paris'
);

//notification groupe
new CronJob('0 0 * * * *',
    function(){
      new Notification('Groupe <?> mise à jour', {
            body: "Le groupe <?> a été mis à jours"
        });
    },
    null,
    true,
    'Europe/Paris'
);