
import React from 'react';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-12 space-y-4">
      <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-blend animate-float">
        Welcome to CodersApp
      </h1>
      <p className="text-lg text-gray-300">
        Connect, Code, and Celebrate with Fellow Developers
      </p>
      <div className="text-sm text-gray-400">CodersApp by KRMU</div>
    </div>
  );
};

export default WelcomeHeader;
