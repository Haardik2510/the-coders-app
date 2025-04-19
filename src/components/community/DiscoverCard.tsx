
import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DiscoverCardProps {
  discovery: {
    id: number;
    title: string;
    description: string;
    members: number;
    trending: boolean;
  };
}

const DiscoverCard = ({ discovery }: DiscoverCardProps) => {
  return (
    <Card className="gradient-card border-none bg-[#1a1f2c]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-white">{discovery.title}</CardTitle>
          {discovery.trending && (
            <Badge variant="outline" className="bg-white/10 text-white border-none">
              <Sparkles className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
        <CardDescription className="text-gray-300">
          <Users className="inline h-4 w-4 mr-1" />
          {discovery.members.toLocaleString()} members
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{discovery.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full animated-button animated-button-primary">
          Join Community
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiscoverCard;
