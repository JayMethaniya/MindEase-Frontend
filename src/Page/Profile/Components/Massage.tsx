
import React from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Props {
  messages: Message[];
  onSelectMessage: (message: Message) => void;
}

export default function Massage({ messages, onSelectMessage }: Props) {
  return (
    <div className="h-full overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No messages yet
        </div>
      ) : (
        <div className="space-y-2 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => onSelectMessage(message)}
              className={`p-4 rounded-lg cursor-pointer transition ${
                message.isRead
                  ? "bg-white hover:bg-gray-50"
                  : "bg-blue-50 hover:bg-blue-100"
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[#287371]">
                  {message.sender}
                </h3>
                <span className="text-sm text-gray-500">
                  
                </span>
              </div>
              <p className="mt-1 text-gray-700 line-clamp-2">
                {message.content}
              </p>
              {!message.isRead && (
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-white bg-[#287371] rounded-full">
                  New
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
