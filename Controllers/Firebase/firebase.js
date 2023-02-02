let admin = require('firebase-admin');
let serviceAccount= require('./../../teams-d72cc-firebase-adminsdk-bkqje-7e856a249f.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://teams-d72cc-default-rtdb.asia-southeast1.firebasedatabase.app"
});
let db = admin.database();
let ref = db.ref("/");
// ref.once("value", function(snapshot) {
//     console.log(snapshot.val());
// });