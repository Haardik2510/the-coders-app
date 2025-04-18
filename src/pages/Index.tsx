
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Code2, Award, Users } from "lucide-react";
import MainNav from "@/components/MainNav";
import WelcomeHeader from "@/components/home/WelcomeHeader";
import FeatureCard from "@/components/home/FeatureCard";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    document.title = "CodersApp: The Universe for Coders";
    
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCardClick = (route: string) => {
    if (!session) {
      navigate('/auth');
    } else {
      navigate(route);
    }
  };

  const features = [
    {
      icon: MessageCircle,
      title: "Chat with Developers",
      description: "Connect with fellow coders in real-time conversations",
      route: '/chat',
      seed: 1
    },
    {
      icon: Code2,
      title: "Solve Together",
      description: "Collaborate on coding challenges and grow together",
      route: '/solve',
      seed: 2
    },
    {
      icon: Award,
      title: "Share Achievements",
      description: "Showcase your coding journey and celebrate wins",
      route: '/achievements',
      seed: 3
    },
    {
      icon: Users,
      title: "Join the Community",
      description: "Be part of an inclusive coding community",
      route: '/community',
      seed: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <WelcomeHeader />
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.route}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  onClick={() => handleCardClick(feature.route)}
                  seed={feature.seed}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
