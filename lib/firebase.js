// // Firebase App (the core Firebase SDK) is always required and
// // must be listed before other Firebase SDKs
// import * as firebase from "firebase/app";

// // Add the Firebase services that you want to use
// import "firebase/firestore";

// var firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     databaseURL: process.env.databaseURL,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId,
//     measurementId: process.env.measurementId
// };

  
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

// Initialize Firebase
(async function () {
    (!admin.apps.length) ?
    await admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    }) :
    admin.app()

// db = admin.firestore();
})();

export default admin ;