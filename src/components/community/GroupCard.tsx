
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GroupCardProps {
  group: {
    id: number | string;
    name: string;
    members: number;
    description: string;
    tags: string[];
  };
}

const GroupCard = ({ group }: GroupCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinGroup = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from('group_members').insert({
        group_id: group.id,
        user_id: userData.user.id
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Group Joined",
        description: `You have successfully joined ${group.name}`,
      });

      navigate(`/group-chat/${group.id}`, { 
        state: { 
          groupName: group.name,
          groupDescription: group.description,
          groupTags: group.tags
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not join group. They might already be a member.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-none bg-black text-white">
      <CardHeader className="relative z-10">
        <CardTitle className="text-white">{group.name}</CardTitle>
        <CardDescription className="text-gray-300">
          <Users className="inline h-4 w-4 mr-1" />
          {group.members.toLocaleString()} members
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 pb-2 text-white">
        <p className="text-gray-300">{group.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {group.tags.map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-none"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="relative z-10">
        <Button 
          className="w-full animated-button animated-button-primary"
          onClick={handleJoinGroup}
        >
          Join Group
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
