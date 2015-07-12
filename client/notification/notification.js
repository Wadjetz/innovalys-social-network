/**
 * Created by Damien on 24/04/2015.
 */

import i18n from '../../commun/local';



/**
 * notification news
 * @param message - the title of the new article who has been add
 */
module.exports.newNotification = function(message){

    new Notification(i18n.__n("news_notify"), {
        body: message
    });
}


/**
 * notification groups
 * @param  message - the new element who has been add to the group
 */

module.exports.groupUpdate = function(message) {
    new Notification(i18n.__n("group_notify_title"),{
        body:message+i18n.__n("group_notify_msg")
    });

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
