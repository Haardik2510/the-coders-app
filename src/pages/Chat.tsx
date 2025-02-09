
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, UserPlus, UserMinus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

interface Following {
  following_id: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

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

  // Follow mutation
  const followMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('follows')
        .insert({ follower_id: currentUser, following_id: userId });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      toast({
        title: "Success",
        description: "User followed successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });

  // Unfollow mutation
  const unfollowMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', currentUser)
        .eq('following_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      toast({
        title: "Success",
        description: "User unfollowed successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });

  const isFollowing = (userId: string) => {
    return followings?.some(f => f.following_id === userId);
  };

  const handleFollowToggle = (userId: string) => {
    if (isFollowing(userId)) {
      unfollowMutation.mutate(userId);
    } else {
      followMutation.mutate(userId);
    }
  };

  const handleProfileClick = (userId: string) => {
    navigate(`/achievements?userId=${userId}`);
  };

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
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            
            <ScrollArea className="h-[70vh] rounded-md border border-gray-800 p-4">
              <div className="space-y-4">
                {profiles?.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
                  >
                    <div 
                      className="flex items-center space-x-4 cursor-pointer"
                      onClick={() => handleProfileClick(profile.id)}
                    >
                      <Avatar>
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                          {profile.username?.[0]?.toUpperCase() || '?'}
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium">{profile.username || 'Anonymous'}</p>
                      </div>
                    </div>
                    
                    {currentUser !== profile.id && (
                      <Button
                        variant={isFollowing(profile.id) ? "destructive" : "default"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollowToggle(profile.id);
                        }}
                        disabled={followMutation.isPending || unfollowMutation.isPending}
                      >
                        {isFollowing(profile.id) ? (
                          <UserMinus className="h-4 w-4 mr-2" />
                        ) : (
                          <UserPlus className="h-4 w-4 mr-2" />
                        )}
                        {isFollowing(profile.id) ? 'Unfollow' : 'Follow'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
