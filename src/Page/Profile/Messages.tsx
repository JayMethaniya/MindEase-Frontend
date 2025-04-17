import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { useSearchParams, useNavigate } from "react-router-dom";
import Conversation from "./Components/Conversation";
import ChatBox from "./Components/ChatBox";
import DefaultLayout from "./Default";

interface ConversationData {
  members: string[];
  _id: string;
}

interface MessageData {
  senderId: string;
  receiverId: string;
  text: string;
  chatId: string;
  createdAt?: string;
}

interface OnlineUser {
  userId: string;
  socketId: string;
}

const Messages = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [currentChat, setCurrentChat] = useState<ConversationData | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [sendMessage, setSendMessage] = useState<MessageData | null>(null);
  const [receivedMessage, setReceivedMessage] = useState<MessageData | null>(
    null
  );
  const socket = useRef<Socket | null>(null);

  const userId = localStorage.getItem("userId");
  const chatId = searchParams.get("chatId");

  // Handle sending message via socket
  useEffect(() => {
    if (sendMessage && socket.current) {
      socket.current.emit("sendMessage", sendMessage);
    }
  }, [sendMessage]);

  // Setup socket connection
  useEffect(() => {
    if (!userId) return;

    socket.current = io("http://localhost:3002");
    socket.current.emit("newUser", userId);

    socket.current.on("getUsers", (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [userId]);

  // Receive message via socket
  useEffect(() => {
    if (!socket.current) return;
    socket.current.on("getMessage", (data: MessageData) => {
      setReceivedMessage(data);
    });
  }, []);

  // Fetch user conversations and set current chat if chatId is present
  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) return;

      try {
        const response = await axios.get<ConversationData[]>(
          `http://localhost:3001/chat/${userId}`
        );
        setConversations(response.data);

        // If chatId is present in URL, find and set the corresponding chat
        if (chatId) {
          const chat = response.data.find((conv) => conv._id === chatId);
          if (chat) {
            setCurrentChat(chat);
          }
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [userId, chatId]);

  // Check if a chat member is online
  const checkOnline = (chat: ConversationData): boolean => {
    const chatMember = chat.members.find((member) => member !== userId);
    return onlineUsers.some((user) => user.userId === chatMember);
  };

  const handleBack = () => {
    setCurrentChat(null);
    navigate("/messages");
  };

  const content = (
    <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
      {/* Mobile Conversations List with DefaultLayout */}
      <div className="md:hidden">
        {!currentChat && (
          <DefaultLayout>
            <div className="w-full p-4 bg-white rounded-lg shadow-md">
              <h1 className="text-xl font-bold mb-3">Messages</h1>
              <div className="text-gray-600 h-[80vh] w-full rounded-lg p-2 overflow-y-auto">
                {conversations.length > 0 ? (
                  conversations.map((chat) => (
                    <div 
                      onClick={() => setCurrentChat(chat)}
                      key={chat._id}
                      className="cursor-pointer"
                    >
                      <Conversation
                        data={chat}
                        currentUser={userId!}
                        online={checkOnline(chat)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No conversations yet.</p>
                )}
              </div>
            </div>
          </DefaultLayout>
        )}
      </div>

      {/* Desktop Conversations List */}
      <div
        className={`hidden md:block w-1/3 p-4 bg-white rounded-lg shadow-md ${
          currentChat ? "hidden md:block" : "block"
        }`}
      >
        <h1 className="text-2xl font-bold mb-3">Messages</h1>
        <div className="text-gray-600 h-full w-full rounded-lg p-2 overflow-y-auto">
          {conversations.length > 0 ? (
            conversations.map((chat) => (
              <div
                onClick={() => setCurrentChat(chat)}
                key={chat._id}
                className="cursor-pointer"
              >
                <Conversation
                  data={chat}
                  currentUser={userId!}
                  online={checkOnline(chat)}
                />
              </div>
            ))
          ) : (
            <p>No conversations yet.</p>
          )}
        </div>
      </div>

      {/* Chat Box */}
      <div
        className={`w-full p-4 bg-white rounded-lg shadow-md ${
          currentChat ? "block" : "hidden md:block"
        }`}
      >
        <ChatBox
          chat={currentChat}
          currentUser={userId || ""}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          onBack={handleBack}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden overflow-hidden">{content}</div>
      <div className="hidden md:block">
        <DefaultLayout>{content}</DefaultLayout>
      </div>
    </>
  );
};

export default Messages;
