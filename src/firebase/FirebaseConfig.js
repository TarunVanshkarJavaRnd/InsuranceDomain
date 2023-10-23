// npm install firebase

// Then, initialize Firebase and begin using the SDKs for the products you'd like to use.

// Import the functions I need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv5jxYzIP52ceJc_aGyr-w3YbBWcZiyjI",
  authDomain: "insurance-domain-1820e.firebaseapp.com",
  projectId: "insurance-domain-1820e",
  storageBucket: "insurance-domain-1820e.appspot.com",
  messagingSenderId: "385501406588",
  appId: "1:385501406588:web:b3dd3b172191c60edcb0f9",
  measurementId: "G-1WETW52C9K"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
