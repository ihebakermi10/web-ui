// components/ChatWindow.tsx

import { useState } from "react";
import { useConversationStore } from "../store/useConversationStore";
import ChatBubble from "./ChatBubble";
import MessageInput from "../components/MessageInput";

import { motion } from "framer-motion";

export default function ChatWindow() {
  const { conversations, currentConversationId, updateConversation } = useConversationStore();
  // Récupère la conversation actuellement sélectionnée
  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  );
  const [isTyping, setIsTyping] = useState(false);

  // Fonction pour envoyer un message
  const sendMessage = async (text: string) => {
    if (!currentConversationId) return;
    // Ajoute le message de l'utilisateur à la conversation
    updateConversation(currentConversationId, {
      id: Date.now().toString(),
      sender: "user",
      text,
    });
    setIsTyping(true);

    // Simulation d'appel à une API pour obtenir une réponse du bot
    setTimeout(() => {
      updateConversation(currentConversationId, {
        id: Date.now().toString(),
        sender: "bot",
        text: "Ceci est une réponse générée par le bot.",
      });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1 p-4 overflow-y-auto">
      <div className="flex-1">
        {currentConversation?.messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && (
          <motion.div
            className="text-gray-500 italic"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            typing...
          </motion.div>
        )}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
