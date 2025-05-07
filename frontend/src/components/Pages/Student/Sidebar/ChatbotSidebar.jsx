import React, { useState } from "react";
import "./ChatbotSidebar.css";

const ChatbotSidebar = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm still learning! 😊", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot-sidebar right">
          <iframe    src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/25/14/20250225143754-JBJAR8YG.json" 
        className="w-96 h-96 border-none rounded-lg shadow-lg"
        title="Chatbot"
      />
    </div>
  );
};

export default ChatbotSidebar;
