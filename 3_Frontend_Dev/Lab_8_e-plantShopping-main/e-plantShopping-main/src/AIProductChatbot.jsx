import React, { useState } from "react";

const products = [
  { name: "Laptop", url: "/products/laptop" },
  { name: "Smartphone", url: "/products/smartphone" },
  { name: "Headphones", url: "/products/headphones" },
];

export default function AIProductChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const userInput = input.trim();
      addMessage(userInput, "user");
      const keyword = userInput.toLowerCase().replace("search for", "").trim();
      const found = products.find(
        (product) => product.name.toLowerCase() === keyword
      );

      if (found) {
        addMessage(`Redirecting you to ${found.name}...`, "bot");
        setTimeout(() => {
          window.location.href = found.url;
        }, 1500);
      } else {
        addMessage("Product not available.", "bot");
      }

      setInput("");
    }
  };

  return (
    <>
      <div
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 cursor-pointer shadow-lg text-xl z-50"
      >
        💬
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span>AI Chatbot</span>
            <button onClick={toggleChat} className="text-white font-bold">
              ×
            </button>
          </div>
          <div className="h-60 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-${msg.sender === "user" ? "right" : "left"}`}
              >
                <span
                  className={`inline-block px-3 py-1 rounded-lg max-w-[90%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleInputKeyPress}
            placeholder="Search for a product..."
            className="w-full border-t p-2 text-sm focus:outline-none"
          />
        </div>
      )}
    </>
  );
}
