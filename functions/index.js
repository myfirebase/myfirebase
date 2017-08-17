var functions = require('firebase-functions');
var admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

exports.sendMessageNotification = functions.database.ref('data/{messageID}').onWrite(event => {
    if (event.data.previous.exists()) {
        return;
    }

    admin.database().ref('data').child(event.params.messageID).once('value').then(function(snap) {
        var messageData = snap.val();

        var topic = messageData.token;
        var payload = {
            notification: {
                title: "You got a new Message",
                body: messageData.data,
                icon: 'https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-128.png'
            }
        };

        admin.messaging().sendToDevice(topic, payload)
            .then(function(response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
                console.log("Error sending message:", error);
            });
    });
});