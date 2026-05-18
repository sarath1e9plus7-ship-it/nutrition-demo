"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Message = {
  id: number;
  text: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Fetch messages from Supabase
  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("Fetch error:", error.message);
      return;
    }

    if (data) {
      setMessages(data);
    }
  }

  // Add new message
  async function addMessage() {
    if (input.trim() === "") return;

    const { error } = await supabase
      .from("messages")
      .insert([{ text: input }]);

    if (error) {
      console.log("Insert error:", error.message);
      return;
    }

    setInput("");
    fetchMessages();
  }

  // Load messages on page load
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Nutrition Demo App
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-lg outline-none"
          />

          <button
            onClick={addMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Messages */}
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">
              No messages yet
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-blue-100 p-3 rounded-lg"
              >
                {msg.text}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}