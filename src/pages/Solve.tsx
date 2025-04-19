
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code, FileSymlink, LucideGitCompare, Users, Award, Zap } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
}

interface LeaderboardEntry {
  username: string;
  solved: number;
  points: number;
}

const Solve = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
  const [selectedMode, setSelectedMode] = useState<string>("solo");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userCode, setUserCode] = useState<string>("");
  
  const challenges = [
    { id: "easy", title: "Easy", description: "Perfect for beginners", color: "#4e6ef2", icon: Code },
    { id: "medium", title: "Medium", description: "Build your skills", color: "#9b87f5", icon: FileSymlink },
    { id: "hard", title: "Hard", description: "Push your limits", color: "#D946EF", icon: LucideGitCompare },
    { id: "expert", title: "Expert", description: "Master the code", color: "#ea384c", icon: Zap },
  ];

  // Sample questions data - in a real app, this would come from the database
  const questions = {
    easy: [
      { id: "e1", title: "Hello World", description: "Write a function that returns 'Hello World'", difficulty: "easy", points: 10 },
      { id: "e2", title: "Sum Two Numbers", description: "Write a function that returns the sum of two numbers", difficulty: "easy", points: 15 },
    ],
    medium: [
      { id: "m1", title: "Palindrome Check", description: "Write a function that checks if a string is a palindrome", difficulty: "medium", points: 25 },
      { id: "m2", title: "Find Duplicates", description: "Write a function that finds duplicates in an array", difficulty: "medium", points: 30 },
    ],
    hard: [
      { id: "h1", title: "Merge Sort", description: "Implement the merge sort algorithm", difficulty: "hard", points: 45 },
      { id: "h2", title: "Binary Search Tree", description: "Implement a binary search tree with insert, delete and find methods", difficulty: "hard", points: 50 },
    ],
    expert: [
      { id: "ex1", title: "Dynamic Programming", description: "Solve the knapsack problem using dynamic programming", difficulty: "expert", points: 75 },
      { id: "ex2", title: "Graph Algorithms", description: "Implement Dijkstra's algorithm for finding shortest paths", difficulty: "expert", points: 80 },
    ],
  };

  // Sample leaderboard data - in a real app, this would come from the database
  const leaderboardData = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      // This would be replaced with actual database call
      return [
        { username: "CodeMaster", solved: 42, points: 1250 },
        { username: "AlgoExpert", solved: 38, points: 1100 },
        { username: "ByteWizard", solved: 35, points: 980 },
        { username: "DevNinja", solved: 31, points: 920 },
        { username: "ProgramPro", solved: 29, points: 850 },
      ] as LeaderboardEntry[];
    },
  });

  const startQuestion = (level: string) => {
    // Get a random question from the selected level
    const levelQuestions = questions[level as keyof typeof questions];
    const randomQuestion = levelQuestions[Math.floor(Math.random() * levelQuestions.length)];
    setCurrentQuestion(randomQuestion);
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setCurrentQuestion(null);
  };

  const handleSubmitSolution = () => {
    // This would be replaced with actual solution checking logic
    alert("Solution submitted! In a real app, this would check your solution against test cases.");
    // Move to next question
    startQuestion(selectedLevel as string);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-white">Solve <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4e6ef2] to-[#ea384c]">Together</span></h1>
            
            {!selectedLevel ? (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {challenges.map((challenge) => (
                    <Card 
                      key={challenge.id}
                      className="border-none bg-black text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                      onClick={() => handleLevelSelect(challenge.id)}
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

                <Card className="border-none bg-black text-white rounded-xl shadow-lg mb-6">
                  <CardHeader>
                    <div className="flex items-center">
                      <Award className="w-6 h-6 mr-2 text-yellow-400" />
                      <CardTitle className="text-white">Leaderboard</CardTitle>
                    </div>
                    <CardDescription className="text-gray-300">Top performers in coding challenges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {leaderboardData.isLoading ? (
                      <p className="text-gray-300">Loading leaderboard...</p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700">
                            <TableHead className="text-gray-300">Rank</TableHead>
                            <TableHead className="text-gray-300">Username</TableHead>
                            <TableHead className="text-gray-300">Solved</TableHead>
                            <TableHead className="text-gray-300 text-right">Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leaderboardData.data?.map((entry, index) => (
                            <TableRow key={index} className="border-gray-700">
                              <TableCell className="text-gray-300 font-medium">{index + 1}</TableCell>
                              <TableCell className="text-white">{entry.username}</TableCell>
                              <TableCell className="text-gray-300">{entry.solved}</TableCell>
                              <TableCell className="text-right text-gray-300">{entry.points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : currentQuestion ? (
              <div className="bg-black text-white p-6 rounded-xl shadow-lg">
                <div className="relative z-10">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentQuestion(null)}
                    className="mb-4 bg-white/10 text-white border-none hover:bg-white/20"
                  >
                    Back to challenge options
                  </Button>
                  
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{currentQuestion.title}</h2>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white">
                        {currentQuestion.difficulty.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white">
                        {currentQuestion.points} points
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6">{currentQuestion.description}</p>
                    
                    <div className="mb-6">
                      <Label htmlFor="code-editor" className="mb-2 block text-white">Your Solution</Label>
                      <textarea
                        id="code-editor"
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="w-full h-64 p-4 rounded-md bg-gray-900 text-white font-mono text-sm"
                        placeholder={`// Write your ${selectedLanguage} code here`}
                      />
                    </div>
                    
                    <Button onClick={handleSubmitSolution} className="w-full">
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black text-white p-6 rounded-xl shadow-lg">
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
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="language-select" className="block mb-2 text-white">Programming Language</Label>
                      <Select defaultValue="javascript" onValueChange={setSelectedLanguage}>
                        <SelectTrigger id="language-select" className="bg-white/10 border-none text-white">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white border-gray-700">
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                          <SelectItem value="ruby">Ruby</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="block mb-2 text-white">Solving Mode</Label>
                      <RadioGroup defaultValue="solo" onValueChange={setSelectedMode} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="solo" id="solo" className="text-primary border-white" />
                          <Label htmlFor="solo" className="text-white">Solo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="group" id="group" className="text-primary border-white" />
                          <Label htmlFor="group" className="text-white">Group (4 members)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button onClick={() => startQuestion(selectedLevel)} className="w-full">
                      Start Solving
                    </Button>
                  </div>
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
