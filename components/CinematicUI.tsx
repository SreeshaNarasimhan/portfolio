import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// --- SYSTEM CURSOR ---
export const SystemCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed w-3 h-3 bg-neon-cyan rounded-full shadow-[0_0_10px_#00f0ff] mix-blend-screen will-change-transform"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Trailing Ring */}
      <motion.div
        className="fixed w-8 h-8 border border-neon-purple rounded-full opacity-50 will-change-transform"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: "spring", damping: 50, stiffness: 200 }}
      />
    </div>
  );
};

// --- ARC REACTOR BUTTON (HIGHLIGHT FEATURE) ---
interface ArcButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

export const ArcReactorButton: React.FC<ArcButtonProps> = ({ children, onClick, className = "", isLoading = false }) => {
  return (
    <motion.button
      className={`relative h-16 w-64 flex items-center justify-center group outline-none ${className}`}
      onClick={onClick}
      whileHover="hover"
      initial="initial"
      whileTap="tap"
    >
      {/* Left Arc (Counter-Clockwise) */}
      <motion.div 
        className="absolute left-0 top-0 w-full h-full will-change-transform"
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: -180, scale: 1.05 },
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 256 64" className="w-full h-full fill-none">
          <path 
            d="M 20 32 A 28 28 0 0 1 48 4 L 100 4" 
            className="stroke-neon-cyan stroke-2 opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_15px_#00f0ff]"
            strokeLinecap="round"
          />
          <path 
            d="M 20 32 A 28 28 0 0 0 48 60 L 100 60" 
            className="stroke-neon-cyan stroke-2 opacity-70 group-hover:opacity-100"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Right Arc (Clockwise) */}
      <motion.div 
        className="absolute right-0 top-0 w-full h-full will-change-transform"
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: 180, scale: 1.05 },
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 256 64" className="w-full h-full fill-none">
           <path 
            d="M 236 32 A 28 28 0 0 0 208 4 L 156 4" 
            className="stroke-neon-purple stroke-2 opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_15px_#b026ff]"
            strokeLinecap="round"
          />
          <path 
            d="M 236 32 A 28 28 0 0 1 208 60 L 156 60" 
            className="stroke-neon-purple stroke-2 opacity-70 group-hover:opacity-100"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
      
      {/* Glow Center Background */}
      <motion.div 
        className="absolute inset-4 bg-gradient-to-r from-neon-purple/0 via-neon-purple/10 to-neon-blue/0 blur-md"
        variants={{
          hover: { opacity: 0.8, scaleX: 1.2 }
        }}
      />

      {/* Text Content */}
      <span className="relative z-10 font-tech uppercase tracking-[0.2em] text-sm text-white group-hover:text-neon-cyan transition-colors duration-300">
        {isLoading ? 'PROCESSING...' : children}
      </span>

      {/* Particle Burst Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div 
            className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
            variants={{
                hover: { 
                    scale: [1, 20], 
                    opacity: [1, 0] 
                }
            }}
            transition={{ duration: 0.5 }}
         />
      </div>

    </motion.button>
  );
};

// --- HOLO CARD (3D TILT) ---
export const HoloCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-glass border border-white/10 rounded-xl backdrop-blur-md shadow-2xl"></div>
      
      {/* Holographic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 p-6 transform translate-z-10">
        {children}
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neon-cyan/50 rounded-tl-lg"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neon-purple/50 rounded-br-lg"></div>
    </motion.div>
  );
};

// --- ENERGY FIELD (CANVAS PARTICLES) ---
export const EnergyField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Cap DPR to 2 to improve performance on high-res screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setCanvasSize = () => {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    };
    
    setCanvasSize();

    const particles: {x: number, y: number, vx: number, vy: number, size: number, color: string}[] = [];
    const colors = ['#b026ff', '#00f0ff', '#ffffff'];

    // Reduced particle count for better performance
    const particleCount = window.innerWidth < 768 ? 20 : 35;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        
        // Simplified Glow for performance
        // ctx.shadowBlur = 10;
        // ctx.shadowColor = p.color; 
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      setCanvasSize();
    };
    
    // Debounced resize handler could be added here, but direct resize is often smoother visually for canvas
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" style={{ width: '100%', height: '100%' }} />;
};

// --- SKILL CIRCLE ---
export const SkillCircle: React.FC<{ label: string; percentage: number }> = ({ label, percentage }) => {
  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer Ring */}
        <svg className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="44" stroke="#1f2937" strokeWidth="2" fill="none" />
          <motion.circle 
            cx="48" cy="48" r="44" 
            stroke="url(#gradient-skill)" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray={276}
            initial={{ strokeDashoffset: 276 }}
            whileInView={{ strokeDashoffset: 276 - (276 * percentage) / 100 }}
            viewport={{ once: true }} // Optimize: Only animate once
            transition={{ duration: 2, ease: "easeOut" }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient-skill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b026ff" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Inner Data */}
        <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-xl font-display font-bold text-white text-shadow">{percentage}%</span>
        </div>

        {/* Orbiting Dot */}
        <motion.div 
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
            <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#00f0ff]"></div>
        </motion.div>
      </div>
      <span className="text-xs font-tech tracking-widest text-gray-400 group-hover:text-neon-lavender transition-colors text-center">{label}</span>
    </div>
  );
};

// --- CERTIFICATE MODAL ---
interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  title: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, imageUrl, title }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div 
        className="relative w-full max-w-4xl max-h-[85vh] bg-void-light/90 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(176,38,255,0.2)] flex flex-col"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/40">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              <h3 className="font-display text-white tracking-wider text-sm md:text-base">{title}</h3>
           </div>
           <button 
             onClick={onClose}
             className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
           >
             <X size={20} />
           </button>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
          {imageUrl ? (
             <div className="relative group cursor-none">
                <img 
                  src={imageUrl} 
                  alt={title}
                  loading="lazy" 
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border-2 border-white/5" 
                />
                <div className="absolute inset-0 pointer-events-none rounded-lg ring-1 ring-white/10 group-hover:ring-neon-cyan/50 transition-all duration-500"></div>
             </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-64 text-gray-500">
               <ZoomIn size={48} className="mb-4 opacity-50" />
               <p className="font-tech text-xs tracking-widest">ENCRYPTED DATA // IMAGE NOT FOUND</p>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-black/40 flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase">
           <span>SECURE CONNECTION ESTABLISHED</span>
           <span>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </div>
      </motion.div>
    </div>
  );
};