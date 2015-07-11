/**
 * Created by Damien on 24/04/2015.
 */

import i18n from '../../commun/local';



/**
 * notification news
 */
module.exports.newNotification = function(message){

    new Notification(i18n.__n("news_notify"), {
        body: message
    });
}


/**
 * notification groups (en cour)
 * @param {int} id_group - the id of the group who is updated
 */

module.exports.groupUpdate = function(id_group) {
    /*var requet = "SELECT users_id FROM members WHERE groups_id = ?";
    var data = [id_group];
    db.query(requet, data, function (error, results, fields) {
        if (error)console.error(error);
        if (results.length > 0) {
            //var clients = io.socket.clients();
            console.log();
        }
    });
*/
};

/**
 * notification groups invitation
 * @param {int} id_group - the id of the group where the user is invited
 */

module.exports.groupInvitation = function(id_group){
  /*  var requet = "SELECT name FROM groups WHERE id=?";
    var data = [id_group];
    db.query(requet, data, function(error, results, fields){
        if(error)console.error(error);
        if(results.length>0){
            var row = results[0];
            new Notification('Invitation à un groupe', {
                body: "Vous avez été invité au sein du groupe "+row["name"]
            });
        }
    });*/
};
