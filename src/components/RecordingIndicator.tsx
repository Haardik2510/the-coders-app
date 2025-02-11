
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const RecordingIndicator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 w-full max-w-[200px] animate-pulse">
      <div className="text-sm text-red-500">Recording</div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default RecordingIndicator;
