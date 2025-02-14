// store/useConversationStore.ts
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export interface Conversation {
  id: string; // Propriété obligatoire
  messages: Message[];
  model: string;
  createdAt: number;
}

interface ConversationStore {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  addConversation: (conv: Conversation) => void;
  updateConversation: (id: string, message: Message) => void;
  setCurrentConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  currentConversation: null,

  addConversation: (conv) => {
    set({
      conversations: [conv, ...get().conversations],
      currentConversation: conv
    });
  },

  updateConversation: (id, message) => {
    const current = get().currentConversation;
    set({
      conversations: get().conversations.map(conv => 
        conv.id === id ? {...conv, messages: [...conv.messages, message]} : conv
      ),
      currentConversation: current?.id === id && current 
        ? {...current, messages: [...current.messages, message]}
        : current
    });
  },

  setCurrentConversation: (id) => {
    const conversation = get().conversations.find(conv => conv.id === id);
    set({ currentConversation: conversation || null });
  },

  deleteConversation: (id) => {
    const current = get().currentConversation;
    set({
      conversations: get().conversations.filter(conv => conv.id !== id),
      currentConversation: current?.id === id ? null : current
    });
  }
}));