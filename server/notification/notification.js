/**
 * Created by Damien on 24/04/2015.
 */

var CronJob = require('cron').CronJob;
var db = requires("../config/database");
var io = require('socket.io').listen(8888);

if (Notification.permission !== "granted")
    Notification.requestPermission();

/**
 * notification news
 */
function newNotification(){
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
}
new CronJob('0 0 13 * * *',
    newNotification(),
    null,
    true,
    'Europe/Paris'
);


/**
 * notification message
 * @param {int} id_user - the id of the user who receive the message
 */
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

/**
 * notification groups (en cour)
 * @param {int} id_group - the id of the group who is updated
 */

module.exports.groupUpdate = function(id_group) {
    var requet = "SELECT users_id FROM members WHERE groups_id = ?";
    var data = [id_group];
    db.query(requet, data, function (error, results, fields) {
        if (error)console.error(error);
        if (results.length > 0) {
            var clients = io.socket.clients();

        }
    });

};

/**
 * notification groups invitation
 * @param {int} id_group - the id of the group where the user is invited
 */
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

/**
 * notification at the connexion
 * @param {int} id_user - the id of the user who is connected
 */
module.exports.connexionNotification = function(id_user){
    var requet = "SELECT groups.name FROM users LEFT JOIN members ON users.id = members.users_id LEFT JOIN groups ON groups.id = members.groups_id WHERE users.id=? AND groups.updated > users.last_connection GROUP BY  groups.name;";
    var data = [id_user];
    db.query(requet, data, function(error, results, fields){
        if(error)console.error(error);
        if(results.length>0){
            results.forEach(function(result){
                var name = result["groups.name"];
                new Notification('Le group mis à jours', {
                   body: "Le group "+name+" à été mis à jour depuis votre dernière visite"
                });
            });
        }
    });
};