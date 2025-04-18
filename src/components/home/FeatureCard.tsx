
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  seed: number;
}

const FeatureCard = ({ icon: Icon, title, description, onClick, seed }: FeatureCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="gradient-card p-6 transition-all duration-500 ease-in-out group hover:shadow-2xl cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg className="w-full h-full">
          <filter id={`turbulence${seed}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="2"
              seed={seed}
              stitchTiles="stitch"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                from="0.01 0.01"
                to="0.02 0.02"
                dur={`${20 + seed * 2}s`}
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
          <rect width="100%" height="100%" fill={`url(#cardGradient${seed})`} filter={`url(#turbulence${seed})`} />
          <linearGradient id={`cardGradient${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={seed === 1 ? "#4e6ef2" : seed === 2 ? "#9b87f5" : seed === 3 ? "#F97316" : "#1EAEDB"} />
            <stop offset="100%" stopColor={seed === 1 ? "#7E69AB" : seed === 2 ? "#D946EF" : seed === 3 ? "#ea384c" : "#4e6ef2"} />
          </linearGradient>
        </svg>
      </div>
      <div className="relative z-10">
        <Icon className="w-8 h-8 text-primary mb-4 group-hover:text-secondary transition-colors duration-500" />
        <h2 className="text-xl font-semibold mb-2 text-white transition-colors duration-500">{title}</h2>
        <p className="text-gray-300 transition-colors duration-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
