import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ChatMessage from "@/components/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import UsersList from "@/components/UsersList";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import UserMenu from "@/components/UserMenu";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
  age: number | null;
  date_of_birth: string | null;
  gender: string | null;
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
  const [showProfileSettings, setShowProfileSettings] = useState(false);

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

  // Fetch current user's profile
  const { data: currentUserProfile } = useQuery({
    queryKey: ['profile', currentUser],
    queryFn: async () => {
      if (!currentUser) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser)
        .single();
      
      if (error) throw error;
      return data as Profile;
    },
    enabled: !!currentUser
  });

  // Setup real-time messages subscription
  useEffect(() => {
    if (!currentUser || !selectedUserId) return;

    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${currentUser},receiver_id.eq.${selectedUserId}),and(sender_id.eq.${selectedUserId},receiver_id.eq.${currentUser}))`,
        },
        (payload) => {
          console.log('New message received:', payload);
          queryClient.setQueryData(['messages', currentUser, selectedUserId], 
            (oldData: Message[] | undefined) => {
              if (!oldData) return [payload.new as Message];
              return [...oldData, payload.new as Message];
            }
          );
        }
      )
      .subscribe();

    console.log('Subscribed to real-time messages');

    return () => {
      console.log('Unsubscribing from real-time messages');
      supabase.removeChannel(channel);
    };
  }, [currentUser, selectedUserId, queryClient]);

  // Fetch messages for selected user with real-time updates enabled
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', currentUser, selectedUserId],
    queryFn: async () => {
      if (!currentUser || !selectedUserId) return [];
      
      console.log('Fetching messages for conversation:', currentUser, selectedUserId);
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUser},receiver_id.eq.${selectedUserId}),and(sender_id.eq.${selectedUserId},receiver_id.eq.${currentUser})`)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }
      
      console.log('Fetched messages:', data);
      return data as Message[];
    },
    enabled: !!currentUser && !!selectedUserId,
    refetchOnWindowFocus: false,
  });

  // Send message mutation with optimistic updates
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!currentUser || !selectedUserId) throw new Error("Not authenticated");
      
      console.log('Sending message:', content);
      
      const newMessage = {
        content,
        sender_id: currentUser,
        receiver_id: selectedUserId,
        created_at: new Date().toISOString(),
        read: false,
      };

      const { error } = await supabase
        .from('messages')
        .insert(newMessage);
      
      if (error) {
        console.error('Error sending message:', error);
        throw error;
      }

      return newMessage;
    },
    onMutate: async (newContent) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['messages', currentUser, selectedUserId] });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData(['messages', currentUser, selectedUserId]);

      // Optimistically update to the new value
      if (currentUser && selectedUserId) {
        queryClient.setQueryData(['messages', currentUser, selectedUserId], 
          (old: Message[] | undefined) => {
            const optimisticMessage = {
              id: 'temp-' + Date.now(),
              content: newContent,
              sender_id: currentUser,
              receiver_id: selectedUserId,
              created_at: new Date().toISOString(),
              read: false,
            };
            return [...(old || []), optimisticMessage];
          }
        );
      }

      // Return a context object with the snapshotted value
      return { previousMessages };
    },
    onError: (err, newContent, context) => {
      console.error('Error in message mutation:', err);
      queryClient.setQueryData(
        ['messages', currentUser, selectedUserId],
        context?.previousMessages
      );
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    },
    onSettled: () => {
      // Always refetch after error or success to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['messages', currentUser, selectedUserId] });
    },
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
      const scrollElement = scrollRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Chat</h1>
              <UserMenu
                currentUserProfile={currentUserProfile}
                showProfileSettings={showProfileSettings}
                setShowProfileSettings={setShowProfileSettings}
                onLogout={handleLogout}
              />
            </div>

            {selectedUserId ? (
              <div className="h-[90vh] flex flex-col">
                <ChatHeader
                  selectedUser={selectedUser}
                  selectedUserId={selectedUserId}
                  currentUser={currentUser || ''}
                  isFollowing={isFollowing(selectedUserId)}
                  onFollowToggle={handleFollowToggle}
                />
                
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

                <ChatInput
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  onSendMessage={handleSendMessage}
                  isPending={sendMessageMutation.isPending}
                />
              </div>
            ) : (
              <UsersList
                profiles={profiles || []}
                currentUser={currentUser || ''}
                followings={followings || []}
                onFollowToggle={handleFollowToggle}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
