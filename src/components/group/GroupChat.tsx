
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CollabEditor from './CollabEditor';
import GroupMembers from './GroupMembers';

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const GroupChat = () => {
  const { groupId } = useParams();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [groupName, setGroupName] = useState('');
  
  useEffect(() => {
    // Subscribe to realtime updates for the group
    const channel = supabase
      .channel(`group_${groupId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        console.log('Current state:', state);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        toast({
          title: "New member joined",
          description: `${newPresences[0]?.username} joined the group`,
        });
      })
      .subscribe();

    // Fetch group details
    const fetchGroupDetails = async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('name')
        .eq('id', groupId)
        .single();

      if (data) {
        setGroupName(data.name);
      }
    };

    fetchGroupDetails();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // In a real app, you would save this message to your database
    const message = {
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      <div className="lg:col-span-3 space-y-4">
        <div className="h-[50vh] bg-gray-900 rounded-lg border border-gray-800">
          <ScrollArea className="h-[calc(50vh-120px)] p-4">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="flex flex-col bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-white">{msg.sender}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white">{msg.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-gray-800"
              />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
        
        <CollabEditor groupId={groupId || ''} />
      </div>
      
      <div className="lg:col-span-1">
        <GroupMembers groupId={groupId || ''} />
      </div>
    </div>
  );
};

export default GroupChat;
