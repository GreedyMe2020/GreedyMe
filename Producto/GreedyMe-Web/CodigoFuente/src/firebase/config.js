import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

firebase.auth();

firebase.firestore();

export default firebase;
