
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GroupCardProps {
  group: {
    id: number;
    name: string;
    members: number;
    description: string;
    tags: string[];
  };
}

const GroupCard = ({ group }: GroupCardProps) => {
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
            <Badge key={tag} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-none">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="relative z-10">
        <Button className="w-full animated-button animated-button-primary">
          Join Group
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
