import firebase from "firebase";

const firebaseConfig = {};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();

export const db = firebase.firestore();
