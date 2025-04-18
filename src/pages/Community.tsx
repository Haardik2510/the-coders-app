import React from 'react';
import MainNav from "@/components/MainNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CommunityHeader from "@/components/community/CommunityHeader";
import PostCard from "@/components/community/PostCard";
import GroupCard from "@/components/community/GroupCard";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <CommunityHeader />
            
            <Tabs defaultValue="feed" className="mb-8">
              <TabsList className="bg-white/5">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="space-y-4 mt-4">
                <Card className="gradient-card border-none p-4">
                  <CardContent className="p-0">
                    <Input 
                      placeholder="Share something with the community..." 
                      className="bg-white/5 border-white/10 text-white mb-4"
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
              
              <TabsContent value="events" className="mt-4">
                <Card className="gradient-card border-none">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-gray-300">Events feature coming soon...</p>
                      <p className="text-sm text-gray-400 mt-4">Stay tuned for upcoming developer events and meetups</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discover" className="mt-4">
                <Card className="gradient-card border-none">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-gray-300">Discover feature coming soon...</p>
                      <p className="text-sm text-gray-400 mt-4">Find new developers and communities based on your interests</p>
                    </div>
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
