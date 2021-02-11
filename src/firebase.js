import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqhOn2OeFQ0M6D5YIhlUlp20550W2UZ1w",
  authDomain: "react-smart-git.firebaseapp.com",
  projectId: "react-smart-git",
  storageBucket: "react-smart-git.appspot.com",
  messagingSenderId: "455507572502",
  appId: "1:455507572502:web:fda7750a690cb900a3c237",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
