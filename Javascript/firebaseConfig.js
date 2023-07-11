// firebaseConfig.js

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB7pUSAuL3_DWGfOfaEBAmjUhrVirTGc7Q",
    authDomain: "misrutinas-65775.firebaseapp.com",
    projectId: "misrutinas-65775",
    storageBucket: "misrutinas-65775.appspot.com",
    messagingSenderId: "240378783112",
    appId: "1:240378783112:web:0084e63f1d6a17212e063d",
    measurementId: "G-MXT6Q33B2W"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Access Firestore
  var db = firebase.firestore();
  
  // Export the database
  export default db;
  