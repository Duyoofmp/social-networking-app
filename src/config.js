import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyA-SUab9LkbZ_IR6QVfud8hrLkX1Ty9F3w",
  authDomain: "social-networking-app-8abf1.firebaseapp.com",
  projectId: "social-networking-app-8abf1",
  storageBucket: "social-networking-app-8abf1.appspot.com",
  messagingSenderId: "135362062974",
  appId: "1:135362062974:web:8b278c00ac43a4ec3f062f",
  measurementId: "G-12VT79JF3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore(app);
const storage=getStorage();

export {app,auth,db,storage}