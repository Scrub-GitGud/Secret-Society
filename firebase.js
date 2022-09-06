// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import {getFirestore, query, getDocs, collection, where, addDoc} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiz5FojN9-YhpNVs581FKFOTrIV3LxvCI",
  authDomain: "react-project-26344.firebaseapp.com",
  databaseURL: "https://react-project-26344-default-rtdb.firebaseio.com",
  projectId: "react-project-26344",
  storageBucket: "react-project-26344.appspot.com",
  messagingSenderId: "160636202636",
  appId: "1:160636202636:web:fa6c6eaff052de4afcd5a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

var database = getDatabase(app);

export {auth, db, database};