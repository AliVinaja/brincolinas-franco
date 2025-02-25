// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvp5_buMcsC8lJKUZ0ljTzCWRxY4SAGeE",
  authDomain: "brincolinas-franco.firebaseapp.com",
  projectId: "brincolinas-franco",
  storageBucket: "brincolinas-franco.appspot.com",
  messagingSenderId: "729215994164",
  appId: "1:729215994164:web:e0d72dd270f0fff3a83d61",
  measurementId: "G-XJEGF56ZEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
export default app;
