
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
        <Card key={achievement.id} className="animate-fade-up">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10" />
              <div>
                <p className="font-medium">
                  {achievement.profiles?.username || "Anonymous"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(achievement.created_at!).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">{achievement.title}</h3>
            <p className="text-muted-foreground">{achievement.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AchievementsList;
