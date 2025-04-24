
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import GroupChatMessage from './GroupChatMessage';
import { Message } from '@/types/chat';

interface ChatMessagesSectionProps {
  messages: Message[];
  loading: boolean;
}

const ChatMessagesSection = ({ messages, loading }: ChatMessagesSectionProps) => {
  return (
    <TabsContent value="chat" className="border rounded-lg border-gray-800">
      <ScrollArea className="h-[60vh] p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <GroupChatMessage 
              key={msg.id} 
              message={msg} 
            />
          ))}
          {loading && (
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            </div>
          )}
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

export default ChatMessagesSection;
