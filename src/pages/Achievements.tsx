
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateAchievement from "@/components/CreateAchievement";
import AchievementsList from "@/components/AchievementsList";
import MainNav from "@/components/MainNav";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Achievements = () => {
  const [selectedTab, setSelectedTab] = useState<"posts" | "stories">("posts");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setAuthError(error.message);
          setIsAuthenticated(false);
          toast({
            variant: "destructive",
            title: "Authentication error",
            description: error.message,
          });
        } else {
          setIsAuthenticated(!!data.session);
          
          if (!data.session) {
            toast({
              variant: "destructive",
              title: "Authentication required",
              description: "Please sign in to create and view achievements.",
            });
          }
        }
      } catch (err: any) {
        console.error("Auth check error:", err);
        setAuthError(err.message || "Failed to check authentication");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const refreshAchievements = () => {
    // This function will be passed to CreateAchievement to refresh the list after creation
    setSelectedTab(selectedTab); // Simply reselect the current tab to trigger a refresh
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-purple/50 to-white">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Achievements</h1>
            
            {authError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            
            <CreateAchievement onSuccess={refreshAchievements} />

            <Tabs
              defaultValue="posts"
              value={selectedTab}
              onValueChange={(value) => setSelectedTab(value as "posts" | "stories")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mt-6">
                <AchievementsList type="post" key={`posts-${isAuthenticated}`} />
              </TabsContent>
              <TabsContent value="stories" className="mt-6">
                <AchievementsList type="story" key={`stories-${isAuthenticated}`} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Achievements;
