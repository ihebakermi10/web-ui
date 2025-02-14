// pages/chat.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    // Vérifie que l'utilisateur est connecté. Sinon, redirige vers la page de login.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex h-screen">
      {/* Barre latérale pour l'historique des conversations */}
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl">Chat</h2>
          {/* Bouton de déconnexion */}
          <button
            onClick={() => signOut(auth)}
            className="p-2 bg-red-500 text-white rounded"
          >
            Déconnexion
          </button>
        </header>
        {/* Fenêtre de chat principale */}
        <ChatWindow />
      </div>
    </div>
  );
}
