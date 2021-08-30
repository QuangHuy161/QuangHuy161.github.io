"use strict";

var _app = require("firebase/app");

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDyANMdWKIXdgP0qRutnAq8G4mOU_k75-E",
  authDomain: "covid-test-fbfda.firebaseapp.com",
  projectId: "covid-test-fbfda",
  storageBucket: "covid-test-fbfda.appspot.com",
  messagingSenderId: "471597847358",
  appId: "1:471597847358:web:42d48b24cd6403b8ded26f",
  measurementId: "G-FD0J6WVTRQ"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
console.log(app);