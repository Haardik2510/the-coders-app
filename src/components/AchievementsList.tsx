
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "./ui/card";

const AchievementsList = ({ type }: { type: "post" | "story" }) => {
  const { data: achievements, isLoading } = useQuery({
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
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {achievements?.map((achievement) => (
        <Card key={achievement.id} className="animate-fade-up bg-black text-white border-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10" />
              <div>
                <p className="font-medium text-white">
                  {achievement.profiles?.username || "Anonymous"}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(achievement.created_at!).toLocaleDateString()}
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
                  />
                ) : achievement.media_type === "video" ? (
                  <video 
                    src={achievement.media_url} 
                    controls
                    className="w-full h-auto rounded-md"
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
