import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCfssx2qWUfu4lDb6CjJMq86dQNJguBGwQ",
  authDomain: "ajaira-pechal.firebaseapp.com",
  projectId: "ajaira-pechal",
  storageBucket: "ajaira-pechal.appspot.com",
  messagingSenderId: "202354242077",
  appId: "1:202354242077:web:5872fb6a41ca0e06130cf4",
};
const app = initializeApp(firebaseConfig);

export {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  getDatabase,
  ref,
  set,
  signInWithEmailAndPassword,
  signOut,
  push,
  onValue,
};
