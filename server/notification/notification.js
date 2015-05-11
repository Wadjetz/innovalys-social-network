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
        var requet = "SELECT COUNT(*) FROM news WHERE DATE(publish) = NOW()";
        var nbArticle = 0;
        db.query(requet, null, function(error, results, fields){
           if(error)console.error(error);
            if(results.length>0){
                var row = results[0];
                nbArticle = row["COUNT(*)"];
            }
        });
        if(nbArticle>0) {
            new Notification('Nouveaux article', {
                body: nbArticle+" articles à été mis en ligne!"
            });
        }
    },
    null,
    true,
    'Europe/Paris'
);


//notification message
module.exports.notificationMessage = function notificationMessage(id_user) {
    var requet = "SELECT * FROM users WHERE users_id=?";
    var data = [id_user];
    db.query(requet, data, function(error, results, fields){
        if(error)console.log(error);
        if(results.length>0){
            var row = results[0];
            var prenom = row["first_name"];
            var nom = row["last_name"];
            new Notification('Nouveau message', {
                body: "Vous avez un nouveau message de "+prenom+" "+nom
            });
        }
    });

}

//notification groupe
new CronJob('0 0 * * * *',
    function(){
      new Notification('Groupe <?> mise a jour', {
            body: "Le groupe <?> a été mis a jours"
        });
    },
    null,
    true,
    'Europe/Paris'
);