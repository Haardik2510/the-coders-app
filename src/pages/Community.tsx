
import MainNav from "@/components/MainNav";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Heart, MessageSquare, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                  <Card key={post.id} className="gradient-card border-none overflow-hidden">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-white text-base">{post.user.name}</CardTitle>
                        <CardDescription className="text-gray-400">{post.user.handle}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2 text-white">
                      <p>{post.content}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-none">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between text-gray-400">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="groups" className="grid md:grid-cols-2 gap-4 mt-4">
                {dummyGroups.map(group => (
                  <Card key={group.id} className="gradient-card border-none overflow-hidden">
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
