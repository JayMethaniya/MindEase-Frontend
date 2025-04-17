import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";
import { IoArrowBack } from "react-icons/io5";

interface ChatBoxProps {
  chat: Chat | null;
  currentUser: string;
  setSendMessage: (msg: any) => void;
  receivedMessage: Message | null;
  onBack: () => void;
}

interface Chat {
  _id: string;
  members: string[];
}

interface User {
  _id: string;
  fullName: string;
  profilePhoto?: string;
}

interface Message {
  _id?: string;
  senderId: string;
  text: string;
  chatId: string;
  createdAt?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  onBack,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (msg: string) => {
    setNewMessage(msg);
  };

  useEffect(() => {
    const userId = chat?.members.find((id) => id !== currentUser);
    if (userId) {
      axios
        .get<User>(`http://localhost:3001/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        })
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }
  }, [chat, currentUser]);

  useEffect(() => {
    if (chat?._id) {
      axios
        .get<Message[]>(`http://localhost:3001/message/${chat._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setMessages(res.data))
        .catch((err) => console.error(err));
    }
  }, [chat]);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  }, [messages, receivedMessage]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat?._id || "",
    };

    const receiverId = chat?.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await axios.post<Message>(
        "http://localhost:3001/message",
        message,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Send error:", error);
    }
  };

  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chat?._id) {
      setMessages((prev) => [...prev, receivedMessage]);
    }
  }, [receivedMessage, chat]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[80vh]">
      {chat ? (
        <>
          {/* Header */}
          <div className="bg-teal-600 p-3 flex items-center space-x-3 sticky top-0 z-10">
            <button 
              onClick={onBack}
              className="md:hidden text-white hover:bg-teal-700 p-1 rounded-full"
            >
              <IoArrowBack size={24} />
            </button>
            <img
              src={userData?.profilePhoto}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-white">
              <div className="font-semibold">{userData?.fullName}</div>
              <div className="text-xs text-teal-100">Online</div>
            </div>
          </div>

          {/* Body */}
          <div 
            className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto scroll-smooth no-scrollbar bg-teal-50"
          >
            {messages.map((message, idx) => (
              <div
                key={idx}
                ref={idx === messages.length - 1 ? scroll : null}
                className={`max-w-[80%] p-3 rounded-xl flex flex-col gap-1 text-sm ${
                  message.senderId === currentUser
                    ? "self-end bg-gradient-to-r from-teal-500 to-teal-600 rounded-br-xl text-white"
                    : "self-start bg-white text-teal-800 rounded-bl-xl shadow-sm"
                }`}
              >
                <span>{message.text}</span>
                <span className={`text-xs self-end ${
                  message.senderId === currentUser ? "text-teal-100" : "text-teal-600"
                }`}>
                  {message.createdAt && format(message.createdAt)}
                </span>
              </div>
            ))}
          </div>

          {/* Sender */}
          <form onSubmit={handleSend} className="bg-white border-t border-teal-100 p-3 sticky bottom-0">
            <div className="flex items-center gap-2">
              <div
                className="bg-teal-100 p-2 rounded-lg font-bold cursor-pointer text-teal-600 hover:bg-teal-200"
                onClick={() => imageRef.current?.click()}
              >
                +
              </div>
              <div className="flex-1" onKeyDown={handleKeyDown}>
                <InputEmoji
                  value={newMessage}
                  onChange={handleChange}
                  shouldReturn={true}
                  shouldConvertEmojiToImage={false}
                  placeholder="Type a message..."
                />
              </div>
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Send
              </button>
              <input type="file" hidden ref={imageRef} />
            </div>
          </form>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-teal-50">
          <div className="text-center text-teal-600">
            <div className="text-2xl mb-2">💬</div>
            <p>Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
