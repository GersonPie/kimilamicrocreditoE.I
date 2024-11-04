// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnC3m4nJZEuSj5HBg1et5yIY9NKfANGNk",
  authDomain: "kimilamicrocredito-firebase.firebaseapp.com",
  projectId: "kimilamicrocredito-firebase",
  storageBucket: "kimilamicrocredito-firebase.appspot.com",
  messagingSenderId: "86381785446",
  appId: "1:86381785446:web:3c0864506f239d302bd8a7",
  measurementId: "G-CVK5MSMC9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);