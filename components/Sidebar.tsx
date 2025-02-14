import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useConversationStore } from "../store/useConversationStore";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar() {
  const {
    conversations,
    addConversation,
    setCurrentConversation,
    currentConversation,
    deleteConversation
  } = useConversationStore();

  const handleNewConversation = () => {
    const newConv = {
      id: uuidv4(),
      messages: [],
      model: "GPT-4",
      createdAt: Date.now()
    };
    addConversation(newConv);
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-80 h-screen flex flex-col bg-gray-900 border-r border-white/10"
    >
      <div className="p-4 space-y-4">
        <button
          onClick={handleNewConversation}
          className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
        >
          <Plus size={18} className="text-white" />
          <span className="text-white">New chat</span>
        </button>

        <div className="border-t border-white/10 pt-4">
          <h3 className="px-3 text-sm text-gray-400 mb-2">Previous chats</h3>
          <div className="space-y-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setCurrentConversation(conv.id)}
                className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                  ${conv.id === currentConversation?.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-gray-400" />
                  <span className="text-white truncate">
                    {conv.messages[0]?.text.substring(0, 24) || "New Chat"}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}