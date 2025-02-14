import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

export default function MessageInput() {
  return (
    <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
      <textarea
        rows={1}
        className="w-full px-6 py-4 bg-transparent resize-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-white"
        placeholder="Message ChatGPT..."
      />
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="absolute right-3 top-3 p-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all"
      >
        <SendHorizonal className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  );
}