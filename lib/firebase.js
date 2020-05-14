import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
(async function () {
  !firebase.apps.length
    ? await firebase.initializeApp(firebaseConfig)
    : firebase.app();
})();

export default firebase;
