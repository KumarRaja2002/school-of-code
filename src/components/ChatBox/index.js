import { useState } from "react";
import axios from "axios";
import "./index.css"; // Import the updated CSS file

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");

    try {
      const res = await axios.post("https://ai-tutor-7779.onrender.com/chat", { message });
      console.log('data is ', res.data);
      setChat([...newChat, { role: "ai", content: res.data.response }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You: " : "AI: "}</strong>
            {msg.role === "ai" ? (
              <div
                className="response-content"
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            ) : (
              <p>{msg.content}</p>
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me a Python question..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
