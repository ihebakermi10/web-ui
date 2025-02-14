// components/Sidebar.tsx

import { useEffect } from "react";
import { useConversationStore } from "../store/useConversationStore";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar() {
  // Récupération des fonctions et données du store (gestion d'état)
  const {
    conversations,
    addConversation,
    setCurrentConversation,
    currentConversationId,
    deleteConversation,
  } = useConversationStore();

  // Vous pouvez ajouter ici une logique pour charger l'historique des conversations depuis localStorage

  // Fonction pour créer une nouvelle conversation
  const handleNewConversation = () => {
    const newConv = {
      id: uuidv4(),      // Génère un identifiant unique pour la conversation
      messages: [],      // Initialise avec aucune message
      model: "GPT-3.5"   // Modèle d'IA par défaut
    };
    addConversation(newConv);
  };

  // Exemple de gestion du changement de modèle (vous pouvez étendre cette fonctionnalité)
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>, convId: string) => {
    // Ici, vous pourriez envoyer une requête à votre backend pour changer le modèle
    // ou mettre à jour localement la conversation
    console.log(`Changer le modèle de la conversation ${convId} en ${e.target.value}`);
  };

  return (
    <div className="w-72 border-r dark:border-gray-700 p-4 overflow-y-auto">
      <button
        onClick={handleNewConversation}
        className="w-full mb-4 p-2 bg-green-500 text-white rounded"
      >
        Nouvelle conversation
      </button>
      <ul>
        {conversations.map((conv) => (
          <li
            key={conv.id}
            className={`p-2 mb-2 rounded cursor-pointer ${
              conv.id === currentConversationId
                ? "bg-blue-200 dark:bg-blue-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => setCurrentConversation(conv.id)}
          >
            <div className="flex justify-between items-center">
              <span>Conversation {conv.id.substring(0, 5)}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();  // Évite que le clic sur supprimer déclenche la sélection de la conversation
                  deleteConversation(conv.id);
                }}
                className="text-red-500"
              >
                Supprimer
              </button>
            </div>
            <select
              value={conv.model}
              onChange={(e) => handleModelChange(e, conv.id)}
              className="mt-2 w-full p-1 border rounded"
            >
              <option value="GPT-3.5">GPT-3.5</option>
              <option value="GPT-4">GPT-4</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
