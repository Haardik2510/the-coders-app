
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
                    className="border-none bg-black text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                    onClick={() => setSelectedLevel(challenge.id)}
                  >
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
              <div className="bg-black text-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
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
