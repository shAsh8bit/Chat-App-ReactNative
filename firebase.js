import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "Your API KEY here",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };

  
  let firebaseApp;

  if (firebase.apps.length === 0) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
  } else {
      firebaseApp = firebase.app();
  }
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { auth, db };