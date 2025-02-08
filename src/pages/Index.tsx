
import MainNav from "@/components/MainNav";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "CodersApp: The Universe for Coders";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-purple/50 to-white">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Welcome to CodersApp
              </h1>
              <p className="text-lg text-gray-600">
                Connect, Code, and Celebrate with Fellow Developers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">Chat with Developers</h2>
                <p className="text-gray-600">
                  Connect with fellow coders in real-time conversations
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300">
                <Code2 className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">Solve Together</h2>
                <p className="text-gray-600">
                  Collaborate on coding challenges and grow together
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">Share Achievements</h2>
                <p className="text-gray-600">
                  Showcase your coding journey and celebrate wins
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">Join the Community</h2>
                <p className="text-gray-600">
                  Be part of an inclusive coding community
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
