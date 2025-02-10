
import { User, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

interface Following {
  following_id: string;
}

interface UsersListProps {
  profiles: Profile[];
  currentUser: string;
  followings: Following[];
  onFollowToggle: (userId: string) => void;
}

const UsersList = ({ profiles, currentUser, followings, onFollowToggle }: UsersListProps) => {
  const navigate = useNavigate();
  
  const isFollowing = (userId: string) => {
    return followings?.some(f => f.following_id === userId);
  };

  return (
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
                  onFollowToggle(profile.id);
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
  );
};

export default UsersList;
