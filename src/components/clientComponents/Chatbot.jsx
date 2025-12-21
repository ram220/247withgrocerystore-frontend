import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", { message: input });
      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
      setInput("");
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { sender: "bot", text: "Sorry, something went wrong!" }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, width: 300, border: "1px solid #ddd", borderRadius: 8, background: "#fff", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <div style={{ padding: 10, height: 300, overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
            <span style={{ display: "inline-block", padding: "5px 10px", borderRadius: 12, background: msg.sender === "user" ? "#fa6f0b" : "#eee", color: msg.sender === "user" ? "#fff" : "#000" }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
        <input
          style={{ flex: 1, border: "none", padding: 10 }}
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button style={{ padding: "0 15px", background: "#fa6f0b", border: "none", color: "#fff" }} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
