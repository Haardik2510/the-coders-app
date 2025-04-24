
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface CollabEditorProps {
  groupId: string;
}

const CollabEditor = ({ groupId }: CollabEditorProps) => {
  const { toast } = useToast();
  const [code, setCode] = useState('// Write your collaborative code here\n\nfunction example() {\n  console.log("Hello, team!");\n}\n');
  const [language, setLanguage] = useState('javascript');
  const [isEditing, setIsEditing] = useState({});
  
  // Simulate other users editing
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = Math.floor(Math.random() * 2);
      if (randomUser === 0) {
        setIsEditing({ user: 'Alex', line: Math.floor(Math.random() * 5) + 1 });
        setTimeout(() => setIsEditing({}), 3000);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    // In a real app, you would sync this with other users in real-time
  };

  const handleRunCode = () => {
    toast({
      title: "Code execution",
      description: "Your code is running in the collaborative environment.",
    });
  };

  return (
    <div className="h-[70vh] flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleRunCode}>Run Code</Button>
      </div>
      
      <div className="relative flex-grow">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-full p-4 bg-gray-950 text-gray-300 font-mono text-sm resize-none focus:outline-none"
          spellCheck={false}
        />
        
        {isEditing.user && (
          <div 
            className="absolute bg-blue-500/20 left-0 right-0" 
            style={{ 
              top: `${(isEditing.line * 24) + 16}px`, 
              height: '24px' 
            }}
          >
            <span className="absolute -top-5 right-2 text-xs text-blue-400">
              {isEditing.user} is editing...
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 bg-gray-900 text-gray-400 text-xs">
        <div className="flex justify-between">
          <span>Collaborative session active • Group #{groupId}</span>
          <span>2 users online</span>
        </div>
      </div>
    </div>
  );
};

export default CollabEditor;
