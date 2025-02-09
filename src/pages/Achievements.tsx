
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateAchievement from "@/components/CreateAchievement";
import AchievementsList from "@/components/AchievementsList";
import MainNav from "@/components/MainNav";

const Achievements = () => {
  const [selectedTab, setSelectedTab] = useState<"posts" | "stories">("posts");

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-purple/50 to-white">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Achievements</h1>
            
            <CreateAchievement />

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
                <AchievementsList type="post" />
              </TabsContent>
              <TabsContent value="stories" className="mt-6">
                <AchievementsList type="story" />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Achievements;
