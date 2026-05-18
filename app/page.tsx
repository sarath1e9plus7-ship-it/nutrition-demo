"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Load messages from database
  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: true });

    if (!error) {
      setMessages(data);
    }
  }

  // Save message to database
  async function addMessage() {
    if (input.trim() === "") return;

    const { error } = await supabase
      .from("messages")
      .insert([{ text: input }]);

    if (!error) {
      setInput("");
      fetchMessages();
    }
  }

  // Run when page loads
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          Nutrition Demo App
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Type something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <button
            onClick={addMessage}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-blue-100 p-3 rounded"
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}