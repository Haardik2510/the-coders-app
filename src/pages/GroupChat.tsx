
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, User, PlusCircle, Code, Share2, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import GroupChatMessage from "@/components/group/GroupChatMessage";
import CollabEditor from "@/components/group/CollabEditor";
import GroupMembers from "@/components/group/GroupMembers";
import { supabase } from "@/integrations/supabase/client";

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

const GroupChat = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    // Scroll to bottom whenever messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // User message
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
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/community')}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{groupName}</h1>
            <p className="text-gray-400 text-sm">{groupDescription}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleInviteFriend}
            className="ml-auto"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Invite Friends
          </Button>
        </div>
        
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
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                            AI
                          </div>
                        </Avatar>
                        <div className="animate-pulse flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
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
              </TabsContent>
              
              <TabsContent value="code" className="border rounded-lg border-gray-800">
                <CollabEditor groupId={groupId || "0"} />
              </TabsContent>
            </Tabs>
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
