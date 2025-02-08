
import MainNav from "@/components/MainNav";
import { MessageCircle, Code2, Award } from "lucide-react";
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
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg transition-all duration-500 ease-in-out group hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/20 rounded-full"
                      style={{
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
                  <MessageCircle className="w-8 h-8 text-primary mb-4 group-hover:text-[#ea384c] transition-colors duration-500" />
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 transition-colors duration-500">Chat with Developers</h2>
                  <p className="text-gray-600 transition-colors duration-500">
                    Connect with fellow coders in real-time conversations
                  </p>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg transition-all duration-500 ease-in-out group hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/20 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float${i % 3} ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <Code2 className="w-8 h-8 text-primary mb-4 group-hover:text-[#ea384c] transition-colors duration-500" />
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 transition-colors duration-500">Solve Together</h2>
                  <p className="text-gray-600 transition-colors duration-500">
                    Collaborate on coding challenges and grow together
                  </p>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg transition-all duration-500 ease-in-out group hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/20 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float${i % 3} ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <Award className="w-8 h-8 text-primary mb-4 group-hover:text-[#ea384c] transition-colors duration-500" />
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 transition-colors duration-500">Share Achievements</h2>
                  <p className="text-gray-600 transition-colors duration-500">
                    Showcase your coding journey and celebrate wins
                  </p>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg transition-all duration-500 ease-in-out group hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/20 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float${i % 3} ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <MessageCircle className="w-8 h-8 text-primary mb-4 group-hover:text-[#ea384c] transition-colors duration-500" />
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 transition-colors duration-500">Join the Community</h2>
                  <p className="text-gray-600 transition-colors duration-500">
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
