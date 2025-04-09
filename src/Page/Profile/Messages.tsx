import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
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
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Message[]>(`http://localhost:3001/user/messages${doctorId ? `?doctorId=${doctorId}` : ''}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        setError("Failed to fetch messages. Please try again later.");
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [doctorId]);

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleSendMessage = async (content: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<Message>(
        'http://localhost:3001/user/messages',
        {
          content,
          receiverId: doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add the new message to the messages list
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setSelectedMessage(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E4747]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
