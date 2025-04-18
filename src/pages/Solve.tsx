
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FileSymlink, LucideGitCompare, Zap } from "lucide-react";
import { useState } from "react";

const Solve = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  const challenges = [
    { id: "easy", title: "Easy", description: "Perfect for beginners", color: "#4e6ef2", icon: Code },
    { id: "medium", title: "Medium", description: "Build your skills", color: "#9b87f5", icon: FileSymlink },
    { id: "hard", title: "Hard", description: "Push your limits", color: "#D946EF", icon: LucideGitCompare },
    { id: "expert", title: "Expert", description: "Master the code", color: "#ea384c", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-white">Solve <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4e6ef2] to-[#ea384c]">Together</span></h1>
            
            {!selectedLevel ? (
              <div className="grid md:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <Card 
                    key={challenge.id}
                    className="border-none overflow-hidden gradient-card hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedLevel(challenge.id)}
                  >
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <svg className="w-full h-full">
                        <filter id={`turbulence-${challenge.id}`} x="0" y="0" width="100%" height="100%">
                          <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01 0.01"
                            numOctaves="2"
                            seed={challenge.id === "easy" ? "1" : challenge.id === "medium" ? "2" : challenge.id === "hard" ? "3" : "4"}
                            stitchTiles="stitch"
                            result="turbulence"
                          >
                            <animate
                              attributeName="baseFrequency"
                              from="0.01 0.01"
                              to="0.02 0.02"
                              dur="20s"
                              repeatCount="indefinite"
                            />
                          </feTurbulence>
                          <feDisplacementMap
                            in="SourceGraphic"
                            in2="turbulence"
                            scale="30"
                            xChannelSelector="R"
                            yChannelSelector="G"
                          />
                        </filter>
                        <rect width="100%" height="100%" fill={`url(#gradient-${challenge.id})`} filter={`url(#turbulence-${challenge.id})`} />
                        <linearGradient id={`gradient-${challenge.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={challenge.color} />
                          <stop offset="100%" stopColor={challenge.id === "easy" ? "#7E69AB" : challenge.id === "medium" ? "#D946EF" : challenge.id === "hard" ? "#F97316" : "#4e6ef2"} />
                        </linearGradient>
                      </svg>
                    </div>
                    
                    <CardHeader className="relative z-10">
                      <div className="p-2 rounded-full bg-white/10 w-12 h-12 flex items-center justify-center mb-2">
                        <challenge.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white">{challenge.title}</CardTitle>
                      <CardDescription className="text-gray-300">{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm text-gray-400">Start solving problems with this difficulty level</p>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button className="w-full" style={{ background: challenge.color }}>
                        Start Solving
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="gradient-card p-6 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0">
                  <svg className="w-full h-full">
                    <filter id="turbulence-selected" x="0" y="0" width="100%" height="100%">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.01"
                        numOctaves="2"
                        seed="5"
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
                        scale="30"
                        xChannelSelector="R"
                        yChannelSelector="G"
                      />
                    </filter>
                    <rect width="100%" height="100%" fill="url(#gradient-selected)" filter="url(#turbulence-selected)" />
                    <linearGradient id="gradient-selected" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e6ef2" />
                      <stop offset="100%" stopColor="#ea384c" />
                    </linearGradient>
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedLevel(null)}
                    className="mb-4 bg-white/10 text-white border-none hover:bg-white/20"
                  >
                    Back to challenges
                  </Button>
                  
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Challenges
                  </h2>
                  
                  <div className="text-gray-300 space-y-4">
                    <p>Collaborative coding feature coming soon...</p>
                    <p>Challenge your friends to solve coding problems together in real-time.</p>
                    <p>We're working hard to bring this feature to you. Stay tuned!</p>
                  </div>
                  
                  <div className="text-sm text-gray-400 mt-4">CodersApp by KRMU</div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Solve;
