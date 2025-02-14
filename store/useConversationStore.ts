// Importation nommée de la fonction create depuis Zustand
import { create } from "zustand";

// Définition de l'interface pour un message
export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

// Définition de l'interface pour une conversation
export interface Conversation {
  id: string;
  messages: Message[];
  model: string; // Par exemple "GPT-3.5" ou "GPT-4"
}

// Définition de l'interface du store
interface ConversationStore {
  conversations: Conversation[];
  currentConversationId: string | null;
  addConversation: (conv: Conversation) => void;
  updateConversation: (id: string, message: Message) => void;
  setCurrentConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
}

// Création du store avec Zustand en fournissant explicitement les types pour 'set' et 'get'
export const useConversationStore = create<ConversationStore>(
  (
    // 'set' permet de mettre à jour l'état. Ici, nous annotons son type.
    set: (
      partial:
        | Partial<ConversationStore>
        | ((state: ConversationStore) => Partial<ConversationStore>)
    ) => void,
    // 'get' permet d'accéder à l'état actuel.
    get: () => ConversationStore
  ) => ({
    conversations: [],
    currentConversationId: null,

    // Ajoute une nouvelle conversation au store et la sauvegarde dans le localStorage.
    addConversation: (conv: Conversation) => {
      set((state: ConversationStore) => {
        const newConversations = [conv, ...state.conversations];
        localStorage.setItem("conversations", JSON.stringify(newConversations));
        return { conversations: newConversations, currentConversationId: conv.id };
      });
    },

    // Met à jour une conversation en ajoutant un nouveau message.
    updateConversation: (id: string, message: Message) => {
      set((state: ConversationStore) => {
        const updated = state.conversations.map((conv: Conversation) =>
          conv.id === id
            ? { ...conv, messages: [...conv.messages, message] }
            : conv
        );
        localStorage.setItem("conversations", JSON.stringify(updated));
        return { conversations: updated };
      });
    },

    // Définit l'ID de la conversation courante.
    setCurrentConversation: (id: string) => {
      set({ currentConversationId: id });
    },

    // Supprime une conversation du store.
    deleteConversation: (id: string) => {
      set((state: ConversationStore) => {
        const filtered = state.conversations.filter((conv: Conversation) => conv.id !== id);
        localStorage.setItem("conversations", JSON.stringify(filtered));
        return { conversations: filtered, currentConversationId: null };
      });
    },
  })
);
