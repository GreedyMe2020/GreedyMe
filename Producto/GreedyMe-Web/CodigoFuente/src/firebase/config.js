import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBMSuKle9DYdzJxk9t2GPxL98Ms296DgLU",
  authDomain: "greedyme-d6c6c.firebaseapp.com",
  databaseURL: "https://greedyme-d6c6c.firebaseio.com",
  projectId: "greedyme-d6c6c",
  storageBucket: "greedyme-d6c6c.appspot.com",
  messagingSenderId: "984416387509",
  appId: "1:984416387509:web:7855a6771b7a68999a99fc",
  measurementId: "G-NFZ55KNHX9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();

export const db = firebase.firestore();
