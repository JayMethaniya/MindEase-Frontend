import React, { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface Props {
  selectedMessage: Message | null;
  onSendMessage: (content: string) => void;
}

export default function ChatBox({ selectedMessage, onSendMessage }: Props) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  if (!selectedMessage) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a message to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-[#287371]">
          {selectedMessage.sender}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example messages - replace with actual messages */}
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
            <p className="text-gray-800">{selectedMessage.content}</p>
            <span className="text-xs text-gray-500 mt-1 block">
              {new Date(selectedMessage.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#287371]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#287371] text-white rounded-lg hover:bg-[#1F5B5B] transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
