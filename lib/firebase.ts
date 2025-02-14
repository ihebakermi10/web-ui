// firebase.ts

// Importez les fonctions nécessaires depuis le SDK Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWSMVxdZoN3Z6qZcifpr4k3aCJRXMcAQA",
  authDomain: "chatbot-4b0a9.firebaseapp.com",
  projectId: "chatbot-4b0a9",
  storageBucket: "chatbot-4b0a9.firebasestorage.app",
  messagingSenderId: "405095692770",
  appId: "1:405095692770:web:2e854d085c25aadd6861bb",
  measurementId: "G-5TB6DLXVCB"
};

// Initialisez l'application Firebase
const app = initializeApp(firebaseConfig);

// Initialisez les différents services Firebase
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

// Créez l'instance du fournisseur Google pour l'authentification
const googleProvider = new GoogleAuthProvider();

// Exportez les services pour pouvoir les utiliser ailleurs
export { app, analytics, auth, db, storage, functions, googleProvider };
