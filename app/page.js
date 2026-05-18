"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // AI states
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Ask AI
  async function askAI() {
    if (question.trim() === "") return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setReply(data.reply);
      } else if (data.error) {
        setReply(data.error);
      } else {
        setReply("No response from AI");
      }

    } catch (error) {
      console.log(error);
      setReply("Something went wrong");
    }

    setLoading(false);
  }

  // Load messages on page load
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Nutrition Demo App
        </h1>

        {/* DATABASE SECTION */}
        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Store Messages In Database
          </h2>

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

        {/* AI SECTION */}
        <div>

          <h2 className="text-xl font-semibold mb-4">
            Ask AI Assistant
          </h2>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Ask AI something..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 border border-gray-300 p-3 rounded-lg outline-none"
            />

            <button
              onClick={askAI}
              className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-lg"
            >
              Ask
            </button>
          </div>

          {/* AI Response */}
          <div className="bg-gray-100 p-4 rounded-lg min-h-[100px] whitespace-pre-wrap">
            {loading ? (
              <p>Thinking...</p>
            ) : reply ? (
              reply
            ) : (
              <p className="text-gray-500">
                AI response will appear here
              </p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}