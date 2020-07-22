import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDzjstZuMunSbr6ks5upmmYW93qey_DoMM",
  authDomain: "greedyme-d6c6c.firebaseapp.com",
  databaseURL: "https://greedyme-d6c6c.firebaseio.com",
  projectId: "greedyme-d6c6c",
  storageBucket: "greedyme-d6c6c.appspot.com",
  messagingSenderId: "984416387509",
  appId: "1:984416387509:web:d758e04c9a2b1a189a99fc",
  measurementId: "G-RM8PHV3KQ1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();

export const db = firebase.firestore();
