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
    <Card className="gradient-card border-none bg-[#1a1f2c] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full">
          <filter id={`turbulence-group-${group.id}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="2"
              seed={group.id}
              stitchTiles="stitch"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                from="0.01 0.01"
                to="0.02 0.02"
                dur="30s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <rect width="100%" height="100%" fill={`url(#group-gradient-${group.id})`} filter={`url(#turbulence-group-${group.id})`} />
          <linearGradient id={`group-gradient-${group.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e6ef2" />
            <stop offset="100%" stopColor={group.id === 1 ? "#9b87f5" : group.id === 2 ? "#D946EF" : "#ea384c"} />
          </linearGradient>
        </svg>
      </div>
      
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
