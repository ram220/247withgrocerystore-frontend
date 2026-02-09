import React, { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

function ChatBot({setCart}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

    //const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
  const API_URL = "http://localhost:5000";

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-IN";
    window.speechSynthesis.speak(msg);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    const token = localStorage.getItem("userToken");

const res = await fetch(`${API_URL}/api/chatbot`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ message: text }),
});


    const data = await res.json();

    setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    speak(data.reply);
    if (data.cart) {
      setCart(data.cart);
    }
  };

  

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (e) => {
      sendMessage(e.results[0][0].transcript);
    };
  };

  return (
    <>
      {/* Floating Icon */}
      <div className="chatbot-icon" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            Grocery Assistant
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)}>➤</button>
            <button onClick={startListening}>🎤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
