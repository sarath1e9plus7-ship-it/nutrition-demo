"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          Nutrition Demo App
        </h1>

        <input
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border p-3 rounded mb-4"
        />

        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-blue-100 p-3 rounded"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}