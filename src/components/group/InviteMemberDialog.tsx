
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus } from "lucide-react";

interface InviteMemberDialogProps {
  groupId: string;
}

export const InviteMemberDialog = ({ groupId }: InviteMemberDialogProps) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url');
    
    if (data) {
      setUsers(data);
    }
  };

  const inviteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('group_members')
        .insert([{ group_id: groupId, user_id: userId }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User has been invited to the group",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not invite user. They might already be in the group.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={fetchUsers}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      {user.username?.[0]?.toUpperCase() || '?'}
                    </div>
                  </Avatar>
                  <span>{user.username || 'Anonymous'}</span>
                </div>
                <Button size="sm" onClick={() => inviteUser(user.id)}>
                  Invite
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
