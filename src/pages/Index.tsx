
import MainNav from "@/components/MainNav";
import { MessageCircle, Code2, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-blend animate-float">
                Welcome to CodersApp
              </h1>
              <p className="text-lg text-gray-300">
                Connect, Code, and Celebrate with Fellow Developers
              </p>
              <div className="text-sm text-gray-400">CodersApp by KRMU</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div 
                onClick={() => handleCardClick('/chat')}
                className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i % 2 === 0 ? '#4e6ef2' : '#ea384c',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float${i % 3} ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>
                <style>
                  {`
                    @keyframes float0 {
                      0% { transform: translate(0, 0) rotate(0deg); }
                      100% { transform: translate(100px, -100px) rotate(360deg); }
                    }
                    @keyframes float1 {
                      0% { transform: translate(0, 0) rotate(0deg); }
                      100% { transform: translate(-100px, -100px) rotate(-360deg); }
                    }
                    @keyframes float2 {
                      0% { transform: translate(0, 0) rotate(0deg); }
                      100% { transform: translate(50px, -150px) rotate(180deg); }
                    }
                  `}
                </style>
                <div className="relative z-10">
                  <MessageCircle className="w-8 h-8 text-primary mb-4 group-hover:text-secondary transition-colors duration-500" />
                  <h2 className="text-xl font-semibold mb-2 text-white transition-colors duration-500">Chat with Developers</h2>
                  <p className="text-gray-300 transition-colors duration-500">
                    Connect with fellow coders in real-time conversations
                  </p>
                </div>
              </div>
              
              <div 
                onClick={() => handleCardClick('/solve')}
                className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i % 2 === 0 ? '#4e6ef2' : '#ea384c',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float${i % 3} ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <Code2 className="w-8 h-8 text-primary mb-4 group-hover:text-secondary transition-colors duration-500" />
                  <h2 className="text-xl font-semibold mb-2 text-white transition-colors duration-500">Solve Together</h2>
                  <p className="text-gray-300 transition-colors duration-500">
                    Collaborate on coding challenges and grow together
                  </p>
                </div>
              </div>
              
              <div 
                onClick={() => handleCardClick('/achievements')}
                className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i % 2 === 0 ? '#4e6ef2' : '#ea384c',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float${i % 3} ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <Award className="w-8 h-8 text-primary mb-4 group-hover:text-secondary transition-colors duration-500" />
                  <h2 className="text-xl font-semibold mb-2 text-white transition-colors duration-500">Share Achievements</h2>
                  <p className="text-gray-300 transition-colors duration-500">
                    Showcase your coding journey and celebrate wins
                  </p>
                </div>
              </div>
              
              <div 
                onClick={() => handleCardClick('/chat')}
                className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i % 2 === 0 ? '#4e6ef2' : '#ea384c',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float${i % 3} ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <MessageCircle className="w-8 h-8 text-primary mb-4 group-hover:text-secondary transition-colors duration-500" />
                  <h2 className="text-xl font-semibold mb-2 text-white transition-colors duration-500">Join the Community</h2>
                  <p className="text-gray-300 transition-colors duration-500">
                    Be part of an inclusive coding community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
