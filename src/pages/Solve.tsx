
import MainNav from "@/components/MainNav";

const Solve = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b]">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 p-6 animate-fade-up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-white">Solve <span className="text-transparent bg-clip-text bg-gradient-blend">Together</span></h1>
            <div className="gradient-card p-6">
              <p className="text-gray-300">Collaborative coding feature coming soon...</p>
              <div className="text-sm text-gray-400 mt-4">CodersApp by KRMU</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Solve;
