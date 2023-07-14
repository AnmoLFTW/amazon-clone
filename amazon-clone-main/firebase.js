import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA5XkdIZcPeTB4AEJWD56gkRuN4li1RA0w",
    authDomain: "yt-e7f31.firebaseapp.com",
    projectId: "yt-e7f31",
    storageBucket: "yt-e7f31.appspot.com",
    messagingSenderId: "1019711739721",
    appId: "1:1019711739721:web:7d397df91a3477be532c98",
    measurementId: "G-GQ4HGV8E80"
  }

  const app=!firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();

  const db=app.firestore();

  export default db