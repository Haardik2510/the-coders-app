
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GroupMembersProps {
  groupId: string;
}

const GroupMembers = ({ groupId }: GroupMembersProps) => {
  const { toast } = useToast();
  const [members] = useState([
    { id: '1', name: 'You', online: true, isCurrentUser: true },
    { id: '2', name: 'Alex', online: true, isCurrentUser: false },
    { id: '3', name: 'Morgan', online: false, isCurrentUser: false },
  ]);

  const handleInviteClick = () => {
    toast({
      title: "Invitation sent",
      description: "Your invitation has been sent to your friend.",
    });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex justify-between items-center">
          <span>Group Members</span>
          <Button variant="ghost" size="sm" onClick={handleInviteClick}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Invite
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50vh]">
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <div className="h-full w-full rounded-full bg-primary flex items-center justify-center">
                      {member.name[0]}
                    </div>
                  </Avatar>
                  <div>
                    <p className="text-sm text-white">
                      {member.name}
                      {member.isCurrentUser && " (You)"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${member.online ? 'bg-green-500' : 'bg-gray-400'} mr-1`}></div>
                  <span className="text-xs text-gray-400">{member.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500">Group #{groupId} • 3 members</p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GroupMembers;
