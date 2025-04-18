
import React from 'react';
import { Search, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CommunityHeader = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-white">
        Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4e6ef2] to-[#ea384c]">Hub</span>
      </h1>
      
      <div className="flex mb-6 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search the community..." 
            className="pl-8 bg-white/5 border-white/10 text-white"
          />
        </div>
        <Button className="ml-4 animated-button animated-button-primary">
          <Users className="mr-2 h-4 w-4" />
          Join Groups
        </Button>
      </div>
    </>
  );
};

export default CommunityHeader;
