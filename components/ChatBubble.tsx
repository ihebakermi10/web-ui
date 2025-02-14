import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { Message } from "../store/useConversationStore";

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`message-bubble ${isUser 
        ? "bg-[var(--primary)] text-white ml-20" 
        : "bg-white/5 text-[var(--text-primary)] mr-20"}`}>
        
        <div className="flex items-start gap-3">
          <div className="flex-1 whitespace-pre-wrap">{message.text}</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigator.clipboard.writeText(message.text)}
            className="opacity-50 hover:opacity-100 transition-opacity">
            <Copy size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}