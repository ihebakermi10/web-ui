import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import { useConversationStore } from "../store/useConversationStore";

export default function ChatWindow() {
  const { currentConversation } = useConversationStore();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {currentConversation?.messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ChatBubble message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="sticky bottom-0 bg-gradient-to-b from-transparent via-white/90 to-white/90 dark:via-gray-900/90 dark:to-gray-900/90 pt-8 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}