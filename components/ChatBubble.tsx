// components/ChatBubble.tsx

import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: { sender: "user" | "bot"; text: string };
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-md my-2 p-3 rounded-lg ${
        isUser
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start"
      }`}
    >
      <p>{message.text}</p>
      {/* Bouton pour copier le texte du message */}
      <button
        onClick={() => navigator.clipboard.writeText(message.text)}
        className="text-xs text-gray-500 mt-1 underline"
      >
        Copier
      </button>
    </motion.div>
  );
}
