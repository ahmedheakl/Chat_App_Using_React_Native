import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcs_uJjqkFhgPpMD4NqYoL_XsrFHUIXPs",
  authDomain: "chatbot-81aa0.firebaseapp.com",
  projectId: "chatbot-81aa0",
  storageBucket: "chatbot-81aa0.appspot.com",
  messagingSenderId: "277893464501",
  appId: "1:277893464501:web:e60475766a2fe7428fd9fc",
};

let app;

if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app;
}

const db = app.firestore();
const auth = firebase.auth();

export { auth, db };
