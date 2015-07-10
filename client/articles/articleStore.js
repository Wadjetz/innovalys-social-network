/**
 * Created by Damien on 08/07/2015.
 */


import _ from 'lodash';

import Store from '../flux/Store';
import notification from '../notification/notification';


const socket = window.io(document.location.host);


var _ArticleData = {
  name:"" ,
  room:"article_new"
};

var articleStore = _.assign(Store, {
    connect: function (news){
        socket.on("connection"), function () {
            console.log("connection");
        }
        
        socket.on('new_article', function (msg, room) {
            console.log("new_article", msg);
            notification.newNotification(msg);

        });
    },
    disconnect:function(){
        socket.disconnect();
    },

    newArticle : function (news) {
        socket.emit("new_article", news);
    }
});