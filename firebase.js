// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVVdw7QCqL2v8ZDlzflfsuqep-8FdhQIQ",
  authDomain: "instagram-a5b92.firebaseapp.com",
  projectId: "instagram-a5b92",
  storageBucket: "instagram-a5b92.appspot.com",
  messagingSenderId: "272516117278",
  appId: "1:272516117278:web:5767acfa73b968ed208f0f",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
