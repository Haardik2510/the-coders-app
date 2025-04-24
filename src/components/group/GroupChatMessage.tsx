
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  isAI?: boolean;
}

interface GroupChatMessageProps {
  message: Message;
}

const GroupChatMessage = ({ message }: GroupChatMessageProps) => {
  const isAI = message.isAI;
  
  return (
    <div className={`flex ${isAI ? 'items-start' : 'items-start flex-row-reverse'}`}>
      <Avatar className="mr-2 ml-2">
        <div className={`h-8 w-8 rounded-full ${isAI ? 'bg-blue-600' : 'bg-primary'} flex items-center justify-center`}>
          {message.sender.name.charAt(0)}
        </div>
      </Avatar>
      <div className={`max-w-[75%] ${isAI ? 'bg-gray-800' : 'bg-primary'} rounded-lg p-3`}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-300">{message.sender.name}</span>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
        </div>
        <p className="text-white">{message.content}</p>
      </div>
    </div>
  );
};

export default GroupChatMessage;
