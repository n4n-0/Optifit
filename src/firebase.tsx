// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnnsdJAYIN74Z60-5_iETMhnhqTtwd_ro",
  authDomain: "optifit-1c831.firebaseapp.com",
  projectId: "optifit-1c831",
  storageBucket: "optifit-1c831.appspot.com",
  messagingSenderId: "964830009687",
  appId: "1:964830009687:web:196633e3ab0ccdea624612",
  measurementId: "G-7SGGQG27PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, db, doc, setDoc };