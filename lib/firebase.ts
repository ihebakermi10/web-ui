// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDWSMVxdZoN3Z6qZcifpr4k3aCJRXMcAQA",
  authDomain: "chatbot-4b0a9.firebaseapp.com",
  projectId: "chatbot-4b0a9",
  storageBucket: "chatbot-4b0a9.firebasestorage.app",
  messagingSenderId: "405095692770",
  appId: "1:405095692770:web:2e854d085c25aadd6861bb",
  measurementId: "G-5TB6DLXVCB"
};

const app = initializeApp(firebaseConfig);

let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics n'est pas supporté dans cet environnement.");
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, storage, functions, googleProvider };
