
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

// Define a proper type for the achievement data
interface Achievement {
  id: string;
  user_id: string;
  created_at: string | null;
  title: string;
  description: string | null;
  type: string;
  media_url: string | null;
  media_type: string | null;
  profiles?: {
    username: string | null;
    avatar_url: string | null;
  } | null;
}

const AchievementsList = ({ type }: { type: "post" | "story" }) => {
  const { data: achievements, isLoading, error } = useQuery({
    queryKey: ["achievements", type],
    queryFn: async () => {
      const timeLimit = type === "story" ? new Date(Date.now() - 24 * 60 * 60 * 1000) : undefined;
      
      let query = supabase
        .from("achievements")
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .eq("type", type)
        .order("created_at", { ascending: false });

      if (timeLimit) {
        query = query.gte("created_at", timeLimit.toISOString());
      }

      const { data, error } = await query;
      if (error) {
        console.error("Achievement query error:", error);
        throw error;
      }
      return data as Achievement[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-black text-white border-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-white/10" />
                  <Skeleton className="h-3 w-16 bg-white/10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-full mb-2 bg-white/10" />
              <Skeleton className="h-20 w-full bg-white/10" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="bg-red-900/20 border-red-800">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading achievements. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!achievements || achievements.length === 0) {
    return (
      <Alert className="bg-white/5 border-white/10">
        <AlertDescription>
          No {type}s found. Be the first to create one!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <Card key={achievement.id} className="animate-fade-up bg-black text-white border-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10" />
              <div>
                <p className="font-medium text-white">
                  {achievement.profiles?.username || "Anonymous"}
                </p>
                <p className="text-sm text-gray-400">
                  {achievement.created_at 
                    ? new Date(achievement.created_at).toLocaleDateString() 
                    : "Unknown date"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2 text-white">{achievement.title}</h3>
            <p className="text-gray-300 mb-4">{achievement.description}</p>
            
            {achievement.media_url && (
              <div className="mt-2 rounded-md overflow-hidden">
                {achievement.media_type === "image" ? (
                  <img 
                    src={achievement.media_url} 
                    alt={achievement.title}
                    className="w-full h-auto rounded-md" 
                    onError={(e) => {
                      console.error("Image failed to load:", achievement.media_url);
                      e.currentTarget.src = "/placeholder.svg"; // Fallback image
                    }}
                  />
                ) : achievement.media_type === "video" ? (
                  <video 
                    src={achievement.media_url} 
                    controls
                    className="w-full h-auto rounded-md"
                    onError={(e) => {
                      console.error("Video failed to load:", achievement.media_url);
                      const target = e.currentTarget;
                      target.innerHTML = "Video failed to load";
                    }}
                  />
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AchievementsList;
