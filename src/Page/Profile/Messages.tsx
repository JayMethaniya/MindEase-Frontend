import React, { useState } from 'react';

import ChatBox from './Components/ChatBox';
import Massage from './Components/Massage';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Example messages - replace with actual data from your backend
  const messages: Message[] = [
    {
      id: "1",
      sender: "Dr. Sarah Johnson",
      content: "Hello! How are you feeling today?",
      timestamp: new Date("2024-03-15T10:00:00"),
      isRead: false,
    },
    {
      id: "2",
      sender: "Support Team",
      content: "Your appointment has been confirmed for next week.",
      timestamp: new Date("2024-03-14T15:30:00"),
      isRead: true,
    },
    {
      id: "3",
      sender: "Therapist Mark",
      content: "Here are some resources that might help you.",
      timestamp: new Date("2024-03-13T09:15:00"),
      isRead: true,
    },
  ];

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleSendMessage = (content: string) => {
    // Implement your message sending logic here
    console.log("Sending message:", content);
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="flex h-full">
        {/* Messages List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-[#287371]">Messages</h1>
          </div>
          <Massage messages={messages} onSelectMessage={handleSelectMessage} />
        </div>

        {/* Chat Area */}
        <div className="w-2/3">
          <ChatBox
            selectedMessage={selectedMessage}
            onSendMessage={handleSendMessage}
          />                                                                                                                                                                                                                                                                                                                                                                                                                  
        </div>
      </div>
    </div>
  );
}

export default Messages;
