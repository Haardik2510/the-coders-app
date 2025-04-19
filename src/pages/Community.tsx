import React from 'react';
import MainNav from "@/components/MainNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Globe, Sparkles } from "lucide-react";
import CommunityHeader from "@/components/community/CommunityHeader";
import PostCard from "@/components/community/PostCard";
import GroupCard from "@/components/community/GroupCard";
import EventCard from "@/components/community/EventCard";
import DiscoverCard from "@/components/community/DiscoverCard";

const Community = () => {
  const dummyPosts = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg",
        handle: "@alexdev"
      },
      content: "Just solved a tricky algorithm problem using dynamic programming. The key insight was recognizing the overlapping subproblems. #algorithms #dp",
      likes: 24,
      comments: 5,
      tags: ["algorithms", "dynamic programming"]
    },
    {
      id: 2,
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg",
        handle: "@sarahcodes"
      },
      content: "I've just published my first React component library! It's been a journey learning about design systems, accessibility, and component API design. Check it out: github.com/sarahcodes/react-ui",
      likes: 47,
      comments: 12,
      tags: ["react", "opensource"]
    },
    {
      id: 3,
      user: {
        name: "Miguel Rodriguez",
        avatar: "/placeholder.svg",
        handle: "@migueldev"
      },
      content: "Having a great time at CodeCon 2025! Anyone else here? Let's meet up to discuss frontend frameworks evolution! #codecon #frontend",
      likes: 31,
      comments: 8,
      tags: ["events", "frontend"]
    }
  ];

  const dummyGroups = [
    {
      id: 1,
      name: "JavaScript Enthusiasts",
      members: 1243,
      description: "For developers passionate about JavaScript and its ecosystem",
      tags: ["javascript", "web dev"]
    },
    {
      id: 2,
      name: "Python Data Science",
      members: 987,
      description: "Share knowledge on Python for data science, ML and AI",
      tags: ["python", "data science", "ML"]
    },
    {
      id: 3,
      name: "Mobile App Developers",
      members: 756,
      description: "Mobile development across platforms - React Native, Flutter, Swift & Kotlin",
      tags: ["mobile", "app dev"]
    }
  ];

  const dummyEvents = [
    {
      id: 1,
      title: "React Summit 2025",
      date: "May 15, 2025",
      time: "9:00 AM PST",
      location: "San Francisco, CA",
      description: "Join the biggest React conference in North America",
      attendees: 342,
      type: "Conference"
    },
    {
      id: 2,
      title: "JavaScript Meetup",
      date: "April 25, 2025",
      time: "6:30 PM EST",
      location: "Virtual",
      description: "Weekly JavaScript community meetup and coding session",
      attendees: 89,
      type: "Meetup"
    }
  ];

  const dummyDiscoveries = [
    {
      id: 1,
      title: "AI & Machine Learning",
      description: "Connect with AI enthusiasts and stay updated with the latest in machine learning",
      members: 1523,
      trending: true
    },
    {
      id: 2,
      title: "Web3 Developers",
      description: "Explore blockchain development and connect with Web3 developers",
      members: 892,
      trending: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <CommunityHeader />
            
            <Tabs defaultValue="feed" className="mb-8">
              <TabsList className="bg-[#1a1f2c] border border-white/10">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="space-y-4 mt-4">
                <Card className="gradient-card border-none bg-[#1a1f2c] p-4">
                  <CardContent className="p-0">
                    <Input 
                      placeholder="Share something with the community..." 
                      className="bg-[#0d1117] border-white/10 text-white mb-4"
                    />
                    <div className="flex justify-end">
                      <Button>Post</Button>
                    </div>
                  </CardContent>
                </Card>
                
                {dummyPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>
              
              <TabsContent value="groups" className="grid md:grid-cols-2 gap-4 mt-4">
                {dummyGroups.map(group => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </TabsContent>
              
              <TabsContent value="events" className="grid md:grid-cols-2 gap-4 mt-4">
                {dummyEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
                <Card className="gradient-card border-none bg-[#1a1f2c] p-6 col-span-2">
                  <CardContent className="flex items-center justify-center space-x-2">
                    <Button className="animated-button animated-button-primary">
                      <Calendar className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discover" className="grid md:grid-cols-2 gap-4 mt-4">
                {dummyDiscoveries.map(item => (
                  <DiscoverCard key={item.id} discovery={item} />
                ))}
                <Card className="gradient-card border-none bg-[#1a1f2c] p-6 col-span-2">
                  <CardContent className="flex items-center justify-center">
                    <Button className="animated-button animated-button-primary">
                      <Globe className="mr-2 h-4 w-4" />
                      Explore More Communities
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;
