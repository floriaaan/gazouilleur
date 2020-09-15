// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// In /utils/firebase.js
// We should import firebase from this module instead of the default package.
import * as firebase from "firebase"; // Should not be used elsewhere in the project
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

firebase.initializeApp(firebaseConfig);
export default firebase;
