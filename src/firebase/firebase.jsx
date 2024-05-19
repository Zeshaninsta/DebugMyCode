import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const App = initializeApp({
  apiKey: "AIzaSyARK9RxnnAG5NF4FI3K5DUv4Y_nVRnznQM",
  authDomain: "debugmycode.firebaseapp.com",
  projectId: "debugmycode",
  storageBucket: "debugmycode.appspot.com",
  messagingSenderId: "458409112904",
  appId: "1:458409112904:web:60f36dba5488684ff42f7d",
  measurementId: "G-X8CDKXFH9X",
});

// Initialize Firebase
const db = getFirestore(App);
const storage = getStorage(App);
const analytics = getAnalytics(App);
const auth = getAuth(App);

export { db, storage, analytics, auth };
