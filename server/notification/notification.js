/**
 * Created by Damien on 24/04/2015.
 *
 * Les <?> vont �tre modifier ce sont les valeurs qui changeron quand une notification s'affichera
 */

var CronJob = require('cron').CronJob;
var db = requires("../config/database");


if (Notification.permission !== "granted")
    Notification.requestPermission();

//notification article
new CronJob('0 0 13 * * *',
    function(){
        var requet = "";
        new Notification('Nouveaux article', {
            body: "<?> articles � �t� mis en ligne!"
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
      new Notification('Groupe <?> mise � jour', {
            body: "Le groupe <?> a �t� mis � jours"
        });
    },
    null,
    true,
    'Europe/Paris'
);