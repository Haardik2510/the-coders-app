
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GroupMembers from '@/components/group/GroupMembers';
import ChatMessagesSection from '@/components/group/ChatMessagesSection';
import CollabEditorSection from '@/components/group/CollabEditorSection';
import GroupChatHeader from '@/components/group/GroupChatHeader';
import { Message } from '@/types/chat';
import { supabase } from "@/integrations/supabase/client";

const GroupChat = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  const groupName = location.state?.groupName || "Group Chat";
  const groupDescription = location.state?.groupDescription || "";
  const groupTags = location.state?.groupTags || [];

  useEffect(() => {
    // Welcome message from AI assistant
    const aiMessage: Message = {
      id: 'welcome',
      content: `Welcome to the ${groupName} group! Ask me anything about ${groupTags.join(", ")} or use the collaborative editor to work on code together.`,
      sender: {
        name: "AI Assistant",
        avatar: "/placeholder.svg"
      },
      timestamp: new Date().toISOString(),
      isAI: true
    };
    
    setMessages([aiMessage]);
  }, [groupName, groupTags]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: {
        name: "You",
      },
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        `That's a great question about ${groupTags[0]}! Have you tried exploring the documentation?`,
        `I can help you with that. For ${groupTags[0]} issues, you might want to check out the collaborative editor tab.`,
        `Let's solve this together! I recommend breaking down the ${groupTags[0]} problem into smaller parts.`,
        `Great point! When working with ${groupTags[0]}, it's important to consider best practices like code readability.`,
        `Have you considered using a different approach for this ${groupTags[0]} challenge? Maybe we can optimize it further.`
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: {
          name: "AI Assistant",
          avatar: "/placeholder.svg"
        },
        timestamp: new Date().toISOString(),
        isAI: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleInviteFriend = () => {
    toast({
      title: "Invitation link copied!",
      description: "Share this link with your friends to join the group chat.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="max-w-6xl mx-auto p-4">
        <GroupChatHeader 
          groupName={groupName}
          groupDescription={groupDescription}
          onInviteFriend={handleInviteFriend}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="chat">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Group Chat
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code className="h-4 w-4 mr-2" />
                  Collaborative Editor
                </TabsTrigger>
              </TabsList>
              
              <ChatMessagesSection messages={messages} loading={loading} />
              <CollabEditorSection groupId={groupId || "0"} />
            </Tabs>
            
            <form onSubmit={handleSendMessage} className="mt-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow bg-gray-900 border-gray-700"
                />
                <Button type="submit" disabled={loading || !message.trim()}>
                  Send
                </Button>
              </div>
            </form>
          </div>
          
          <div className="lg:col-span-1">
            <GroupMembers groupId={groupId || "0"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
