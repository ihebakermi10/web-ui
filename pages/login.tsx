// pages/login.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import { auth, googleProvider } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

export default function LoginPage() {
  // État pour déterminer si c'est une inscription ou une connexion
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Gère la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/chat"); // Redirige vers l'interface de chat
    } catch (error) {
      console.error("Erreur d'authentification", error);
    }
  };

  // Connexion via Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/chat");
    } catch (error) {
      console.error("Erreur avec Google", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="p-8 bg-white dark:bg-gray-900 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">
          {isSignUp ? "Inscription" : "Connexion"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {isSignUp ? "S'inscrire" : "Se connecter"}
          </button>
        </form>
        <button
          onClick={signInWithGoogle}
          className="mt-4 p-2 bg-red-500 text-white rounded w-full"
        >
          Se connecter avec Google
        </button>
        <p className="mt-4 text-center">
          {isSignUp
            ? "Déjà un compte ?"
            : "Pas encore de compte ?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-blue-500 underline"
          >
            {isSignUp ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </div>
    </div>
  );
}
