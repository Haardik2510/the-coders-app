
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  seed: number;
}

const FeatureCard = ({ icon: Icon, title, description, onClick }: FeatureCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="p-6 bg-black text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
    >
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
