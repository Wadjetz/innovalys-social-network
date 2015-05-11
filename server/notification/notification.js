/**
 * Created by Damien on 24/04/2015.
 *
 * Les <?> vont �tre modifier ce sont les valeurs qui changeron quand une notification s'affichera
 */

var CronJob = require('cron').CronJob;
var db = requires("../config/database");


if (Notification.permission !== "granted")
    Notification.requestPermission();

//notification news
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
    var requet = "SELECT first_name, last_name FROM users WHERE id=?";
    var data = [id_user];
    db.query(requet, data, function(error, results, fields){
        if(error)console.error(error);
        if(results.length>0){
            var row = results[0];
            var prenom = row["first_name"];
            var nom = row["last_name"];
            new Notification('Nouveau message', {
                body: "Vous avez un nouveau message de "+prenom+" "+nom
            });
        }
    });

};

//notification groups
new CronJob('0 0 * * * *',
    function(){
        var requet = "SELECT groups_id FROM members WHERE user_id = ?";
        var data = [0];
        db.query(requet, data, function(error, results, fields){
            if(error)console.error(error);
            if(results.length>0){
                results.forEach(function(result){
                    var requetGroups = "SELECT name FROM groups WHERE id=? AND DATE(updated) = NOW()";
                    var dataGroups = [result["groups_id"]];
                    db.query(requetGroups, dataGroups, function(error, resultsGroups, fields){
                        if(error)console.error(error);
                        if(resultsGroups.length>0){
                            var row = resultsGroups[0];
                            new Notification('Group '+row["name"]+' mis a jour', {
                                body: "Le group "+row["name"]+" a \351t\351 mis a jour"
                            });
                        }
                    });
                });
            }
        });

    },
    null,
    true,
    'Europe/Paris'
);

//notification groups invitation
module.exports.groupInvitation = function(id_group){
    var requet = "SELECT name FROM groups WHERE id=?";
    var data = [id_group];
    db.query(requet, data, function(error, results, fields){
        if(error)console.error(error);
        if(results.length>0){
            var row = results[0];
            new Notification('Invitation à un groupe', {
                body: "Vous avez été invité au sein du groupe "+row["name"]
            });
        }
    });
};