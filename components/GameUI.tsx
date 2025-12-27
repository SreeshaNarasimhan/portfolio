import React from 'react';
import { Loader2 } from 'lucide-react';

// --- Cyberpunk Button ---
interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "relative group font-display font-bold tracking-wider uppercase transition-all duration-200 clip-corner active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-cyber-purple/20 text-cyber-purple border border-cyber-purple hover:bg-cyber-purple hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]",
    secondary: "bg-cyber-blue/10 text-cyber-blue border border-cyber-blue hover:bg-cyber-blue hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]",
    danger: "bg-red-500/10 text-red-500 border border-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]",
    ghost: "bg-transparent text-gray-400 border border-transparent hover:text-white hover:border-gray-600",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} py-3 px-8`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {!isLoading && icon}
      <span className="relative z-10">{children}</span>
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></div>
    </button>
  );
};

// --- Glass Panel Container ---
export const CyberPanel: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ 
  children, 
  className = '', 
  title 
}) => {
  return (
    <div className={`relative bg-cyber-glass backdrop-blur-md border border-gray-800 p-6 ${className} clip-hex`}>
      {title && (
        <div className="absolute -top-3 left-6 px-4 bg-cyber-black border border-cyber-purple/50 text-cyber-purple text-xs font-display tracking-[0.2em] uppercase">
          {title}
        </div>
      )}
      {children}
      {/* HUD Lines */}
      <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-cyber-purple to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-20 h-[1px] bg-gradient-to-r from-cyber-purple to-transparent"></div>
    </div>
  );
};

// --- XP/Skill Bar ---
export const SkillBar: React.FC<{ label: string; level: number; color?: string }> = ({ 
  label, 
  level, 
  color = 'bg-cyber-purple' 
}) => {
  return (
    <div className="mb-4 group">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300 font-display text-sm tracking-wider group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-cyber-blue font-mono text-xs">LVL {level}%</span>
      </div>
      <div className="w-full bg-gray-900 h-2 relative overflow-hidden border border-gray-800">
        {/* Fill */}
        <div 
          className={`h-full ${color} relative transition-all duration-1000 ease-out`} 
          style={{ width: `${level}%` }}
        >
          {/* Animated Glow overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
          {/* Leading edge */}
          <div className="absolute right-0 top-0 h-full w-[2px] bg-white shadow-[0_0_10px_white]"></div>
        </div>
        {/* Background grid lines in bar */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1 opacity-20">
            {[...Array(10)].map((_, i) => <div key={i} className="w-[1px] h-full bg-gray-500"></div>)}
        </div>
      </div>
    </div>
  );
};

// --- Stat Card ---
export const StatCard: React.FC<{ label: string; value: string | number; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-cyber-dark/50 border border-gray-800 p-3 flex items-center gap-3 hover:border-cyber-purple/50 transition-colors cursor-default">
    <div className="text-cyber-purple opacity-80">{icon}</div>
    <div>
      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-display">{label}</div>
      <div className="text-white font-mono text-lg leading-none">{value}</div>
    </div>
  </div>
);