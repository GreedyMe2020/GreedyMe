import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

const secondaryAppConfig = {
  apiKey: "AIzaSyAXobHKHp5lVP9htkQlKn1q-lw-f4Zt14Y",
  authDomain: "greedyme-mobile.firebaseapp.com",
  databaseURL: "https://greedyme-mobile.firebaseio.com",
  projectId: "greedyme-mobile",
  storageBucket: "greedyme-mobile.appspot.com",
  messagingSenderId: "652418121698",
  appId: "1:652418121698:web:f76c3cd66b9fb21a5743bb",
  measurementId: "G-1XY72L5P46",
};

const secondaryApp = firebase.initializeApp(secondaryAppConfig, "secondary");

export default secondaryApp;
