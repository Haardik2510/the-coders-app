
import { MessageCircle, Code2, Award, Home, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MainNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: MessageCircle, label: "Chat", path: "/chat" },
    { icon: Code2, label: "Solve", path: "/solve" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: Award, label: "Achievements", path: "/achievements" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0c1220]/80 backdrop-blur-lg border-t border-white/10 md:relative md:border-t-0 md:border-r z-50">
      <div className="flex md:flex-col justify-around md:justify-start md:gap-4 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-gradient-blend text-white animate-pulse-blue"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MainNav;
