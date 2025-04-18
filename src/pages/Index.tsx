
import MainNav from "@/components/MainNav";
import { MessageCircle, Code2, Award, Users } from "lucide-react";
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
                className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-full h-full">
                    <filter id="turbulence1" x="0" y="0" width="100%" height="100%">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.01"
                        numOctaves="2"
                        seed="1"
                        stitchTiles="stitch"
                        result="turbulence"
                      >
                        <animate
                          attributeName="baseFrequency"
                          from="0.01 0.01"
                          to="0.02 0.02"
                          dur="20s"
                          repeatCount="indefinite"
                        />
                      </feTurbulence>
                      <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="30"
                        xChannelSelector="R"
                        yChannelSelector="G"
                      />
                    </filter>
                    <rect width="100%" height="100%" fill="url(#cardGradient1)" filter="url(#turbulence1)" />
                    <linearGradient id="cardGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4e6ef2" />
                      <stop offset="100%" stopColor="#7E69AB" />
                    </linearGradient>
                  </svg>
                </div>
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
                className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-full h-full">
                    <filter id="turbulence2" x="0" y="0" width="100%" height="100%">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.01"
                        numOctaves="2"
                        seed="2"
                        stitchTiles="stitch"
                        result="turbulence"
                      >
                        <animate
                          attributeName="baseFrequency"
                          from="0.01 0.01"
                          to="0.02 0.02"
                          dur="25s"
                          repeatCount="indefinite"
                        />
                      </feTurbulence>
                      <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="30"
                        xChannelSelector="R"
                        yChannelSelector="G"
                      />
                    </filter>
                    <rect width="100%" height="100%" fill="url(#cardGradient2)" filter="url(#turbulence2)" />
                    <linearGradient id="cardGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9b87f5" />
                      <stop offset="100%" stopColor="#D946EF" />
                    </linearGradient>
                  </svg>
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
                className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-full h-full">
                    <filter id="turbulence3" x="0" y="0" width="100%" height="100%">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.01"
                        numOctaves="2"
                        seed="3"
                        stitchTiles="stitch"
                        result="turbulence"
                      >
                        <animate
                          attributeName="baseFrequency"
                          from="0.01 0.01"
                          to="0.02 0.02"
                          dur="22s"
                          repeatCount="indefinite"
                        />
                      </feTurbulence>
                      <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="30"
                        xChannelSelector="R"
                        yChannelSelector="G"
                      />
                    </filter>
                    <rect width="100%" height="100%" fill="url(#cardGradient3)" filter="url(#turbulence3)" />
                    <linearGradient id="cardGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#ea384c" />
                    </linearGradient>
                  </svg>
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
                onClick={() => handleCardClick('/community')}
                className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-full h-full">
                    <filter id="turbulence4" x="0" y="0" width="100%" height="100%">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.01"
                        numOctaves="2"
                        seed="4"
                        stitchTiles="stitch"
                        result="turbulence"
                      >
                        <animate
                          attributeName="baseFrequency"
                          from="0.01 0.01"
                          to="0.02 0.02"
                          dur="28s"
                          repeatCount="indefinite"
                        />
                      </feTurbulence>
                      <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="30"
                        xChannelSelector="R"
                        yChannelSelector="G"
                      />
                    </filter>
                    <rect width="100%" height="100%" fill="url(#cardGradient4)" filter="url(#turbulence4)" />
                    <linearGradient id="cardGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1EAEDB" />
                      <stop offset="100%" stopColor="#4e6ef2" />
                    </linearGradient>
                  </svg>
                </div>
                <div className="relative z-10">
                  <Users className="w-8 h-8 text-primary mb-4 group-hover:text-secondary transition-colors duration-500" />
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
