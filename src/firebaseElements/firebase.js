import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import 'firebase/firebase-storage'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyACg-q8q7gTw2lWgv4yzZFzFmrN5A6wVGE",
    authDomain: "pointofsale-42351.firebaseapp.com",
    projectId: "pointofsale-42351",
    storageBucket: "pointofsale-42351.appspot.com",
    messagingSenderId: "482829360659",
    appId: "1:482829360659:web:b808291a65ad11b2e4a9e6"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase