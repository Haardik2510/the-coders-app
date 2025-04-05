
import MainNav from "@/components/MainNav";

const Solve = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-white">Solve <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4e6ef2] to-[#ea384c]">Together</span></h1>
            
            <div className="gradient-card p-6 transition-all duration-300 group hover:shadow-2xl">
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
                <p className="text-gray-300">Collaborative coding feature coming soon...</p>
                <div className="text-sm text-gray-400 mt-4">CodersApp by KRMU</div>
              </div>
            </div>
          </div>
        </main>
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
    </div>
  );
};

export default Solve;
