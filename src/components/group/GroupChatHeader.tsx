
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GroupChatHeaderProps {
  groupName: string;
  groupDescription: string;
  onInviteFriend: () => void;
}

const GroupChatHeader = ({ groupName, groupDescription, onInviteFriend }: GroupChatHeaderProps) => {
  const navigate = useNavigate();
  
  return (
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
        onClick={onInviteFriend}
        className="ml-auto"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Invite Friends
      </Button>
    </div>
  );
};

export default GroupChatHeader;
