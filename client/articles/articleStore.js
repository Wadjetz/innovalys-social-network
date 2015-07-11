/**
 * Created by Damien on 08/07/2015.
 */


import _ from 'lodash';

import Store from '../flux/Store';
import notification from '../notification/notification';


const socket = window.io(document.location.host);


var _ArticleData = {
  name:""
};

var articleStore = _.assign(Store, {
    connect: function (){

        console.log("connect");
        socket.on("connect", function () {
            console.log("connect");
        });
        
        socket.on('new_article', function (msg) {
            console.log("new_article", msg);
            notification.newNotification(msg);

        });
    },
    disconnect:function(){
        socket.disconnect();
    },

    newArticle:function(title){
        _ArticleData.name = title;
        socket.emit("new_article", _ArticleData.name);
    }
});



export default articleStore;