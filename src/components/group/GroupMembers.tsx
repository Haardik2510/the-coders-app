
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { InviteMemberDialog } from './InviteMemberDialog';

interface GroupMembersProps {
  groupId: string;
}

const GroupMembers = ({ groupId }: GroupMembersProps) => {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          user_id,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .eq('group_id', groupId);

      if (data) {
        setMembers(data);
      }
    };

    fetchMembers();

    // Subscribe to member changes
    const channel = supabase
      .channel('group_members')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'group_members',
        filter: `group_id=eq.${groupId}`
      }, () => {
        fetchMembers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex justify-between items-center">
          <span>Group Members</span>
          <InviteMemberDialog groupId={groupId} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50vh]">
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.user_id} className="flex items-center space-x-3">
                <Avatar>
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    {member.profiles?.username?.[0]?.toUpperCase() || '?'}
                  </div>
                </Avatar>
                <div>
                  <p className="text-sm text-white">
                    {member.profiles?.username || 'Anonymous'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GroupMembers;
