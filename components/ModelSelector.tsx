import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ModelSelector() {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="relative">
      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all">
        <span className="font-medium text-white">GPT-4</span>
        <ChevronDown className="w-4 h-4 text-white" />
      </button>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-full left-0 mt-2 w-48 bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-2 space-y-1"
      >
        {['GPT-4', 'GPT-3.5'].map((model) => (
          <button
            key={model}
            className="w-full px-4 py-2 text-left rounded-lg hover:bg-white/10 transition text-white"
          >
            {model}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}