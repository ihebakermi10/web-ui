import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { cn } from "../lib/utils";
import ModelSelector from "../components/ModelSelector";

export default function ChatPage() {
  return (
    <div className={cn(
      "h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100",
      "transition-colors duration-200 ease-in-out"
    )}>
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-white/10 flex items-center px-6 bg-white dark:bg-gray-800">
          <div className="max-w-3xl w-full mx-auto flex items-center justify-between">
            <ModelSelector />
          </div>
        </header>
        
        <ChatWindow />
      </main>
    </div>
  );
}