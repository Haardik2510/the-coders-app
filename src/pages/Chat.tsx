
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, UserPlus, UserMinus, ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ChatMessage from "@/components/ChatMessage";
import { Input } from "@/components/ui/input";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

interface Following {
  following_id: string;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
}

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const selectedUserId = searchParams.get("userId");
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check authentication status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
        return;
      }
      setCurrentUser(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Fetch all profiles
  const { data: profiles, isLoading: profilesLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      return data as Profile[];
    }
  });

  // Fetch messages for selected user
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', currentUser, selectedUserId],
    queryFn: async () => {
      if (!currentUser || !selectedUserId) return [];
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUser},receiver_id.eq.${selectedUserId}),and(sender_id.eq.${selectedUserId},receiver_id.eq.${currentUser})`)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Message[];
    },
    enabled: !!currentUser && !!selectedUserId
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!currentUser || !selectedUserId) throw new Error("Not authenticated");
      const { error } = await supabase
        .from('messages')
        .insert({ 
          content,
          sender_id: currentUser,
          receiver_id: selectedUserId
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setNewMessage("");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });

  // Fetch current user's followings
  const { data: followings, isLoading: followingsLoading } = useQuery({
    queryKey: ['followings', currentUser],
    queryFn: async () => {
      if (!currentUser) return [];
      const { data, error } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', currentUser);
      
      if (error) throw error;
      return data as Following[];
    },
    enabled: !!currentUser
  });

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const isFollowing = (userId: string) => {
    return followings?.some(f => f.following_id === userId);
  };

  const handleFollowToggle = async (userId: string) => {
    if (isFollowing(userId)) {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', currentUser)
        .eq('following_id', userId);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }
    } else {
      const { error } = await supabase
        .from('follows')
        .insert({ follower_id: currentUser, following_id: userId });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }
    }
    queryClient.invalidateQueries({ queryKey: ['followings'] });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessageMutation.mutate(newMessage.trim());
    }
  };

  const selectedUser = profiles?.find(p => p.id === selectedUserId);

  if (profilesLoading || followingsLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {selectedUserId ? (
              <div className="h-[90vh] flex flex-col">
                <div className="flex items-center space-x-4 mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/chat')}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar>
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      {selectedUser?.username?.[0]?.toUpperCase() || '?'}
                    </div>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{selectedUser?.username || 'Anonymous'}</p>
                  </div>
                  {currentUser !== selectedUserId && (
                    <Button
                      variant={isFollowing(selectedUserId) ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleFollowToggle(selectedUserId)}
                    >
                      {isFollowing(selectedUserId) ? (
                        <UserMinus className="h-4 w-4 mr-2" />
                      ) : (
                        <UserPlus className="h-4 w-4 mr-2" />
                      )}
                      {isFollowing(selectedUserId) ? 'Unfollow' : 'Follow'}
                    </Button>
                  )}
                </div>
                
                <ScrollArea ref={scrollRef} className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messagesLoading ? (
                      <div className="flex justify-center">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    ) : messages?.length === 0 ? (
                      <p className="text-center text-gray-500">No messages yet</p>
                    ) : (
                      messages?.map((message) => (
                        <ChatMessage
                          key={message.id}
                          content={message.content}
                          isSender={message.sender_id === currentUser}
                          timestamp={message.created_at}
                        />
                      ))
                    )}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-900 border-gray-800 text-white"
                  />
                  <Button 
                    type="submit" 
                    disabled={sendMessageMutation.isPending || !newMessage.trim()}
                  >
                    {sendMessageMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Send'
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-6">Chat</h1>
                <ScrollArea className="h-[70vh] rounded-md border border-gray-800 p-4">
                  <div className="space-y-4">
                    {profiles?.map((profile) => (
                      profile.id !== currentUser && (
                        <div
                          key={profile.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer"
                          onClick={() => navigate(`/chat?userId=${profile.id}`)}
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                                {profile.username?.[0]?.toUpperCase() || '?'}
                              </div>
                            </Avatar>
                            <div>
                              <p className="font-medium">{profile.username || 'Anonymous'}</p>
                            </div>
                          </div>
                          
                          <Button
                            variant={isFollowing(profile.id) ? "destructive" : "default"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFollowToggle(profile.id);
                            }}
                          >
                            {isFollowing(profile.id) ? (
                              <UserMinus className="h-4 w-4 mr-2" />
                            ) : (
                              <UserPlus className="h-4 w-4 mr-2" />
                            )}
                            {isFollowing(profile.id) ? 'Unfollow' : 'Follow'}
                          </Button>
                        </div>
                      )
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
