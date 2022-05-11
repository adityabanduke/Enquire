// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2vYNZTO7qQpLkfeW_ujNq6piUAbm8kUM",
  authDomain: "enquire-3bea9.firebaseapp.com",
  databaseURL: "https://enquire-3bea9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "enquire-3bea9",
  storageBucket: "enquire-3bea9.appspot.com",
  messagingSenderId: "874566572471",
  appId: "1:874566572471:web:3c06cbdd05e00678a2b032"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;