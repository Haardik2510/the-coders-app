
import { ArrowLeft, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

interface ChatHeaderProps {
  selectedUser: Profile | undefined;
  selectedUserId: string;
  currentUser: string;
  isFollowing: boolean;
  onFollowToggle: (userId: string) => void;
}

const ChatHeader = ({ selectedUser, selectedUserId, currentUser, isFollowing, onFollowToggle }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate to the index page instead of just the chat list
    navigate('/');
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleGoBack}
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
          variant={isFollowing ? "destructive" : "default"}
          size="sm"
          onClick={() => onFollowToggle(selectedUserId)}
        >
          {isFollowing ? (
            <UserMinus className="h-4 w-4 mr-2" />
          ) : (
            <UserPlus className="h-4 w-4 mr-2" />
          )}
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
