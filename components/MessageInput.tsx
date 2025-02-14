// components/MessageInput.tsx

import { useState } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");

  // Gère la soumission du message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        placeholder="Tapez votre message..."
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Envoyer
      </button>
    </form>
  );
}
