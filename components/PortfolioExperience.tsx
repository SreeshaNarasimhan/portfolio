import React, { useRef, useState } from 'react';
import { ResumeData, Certification } from '../types';
import { ArcReactorButton, HoloCard, SkillCircle, CertificateModal } from './CinematicUI';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, ShieldCheck, Database, Zap, Globe, Award, Key, Download } from 'lucide-react';

interface PortfolioExperienceProps {
  data: ResumeData;
  onExport: () => void;
  isExporting: boolean;
}

const PortfolioExperience: React.FC<PortfolioExperienceProps> = ({ data, onExport, isExporting }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <div ref={containerRef} className="relative z-10 w-full min-h-screen text-white pb-32">
      
      {/* MODAL WRAPPER */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal 
            isOpen={true} 
            onClose={() => setSelectedCert(null)} 
            imageUrl={selectedCert.image}
            title={selectedCert.title}
          />
        )}
      </AnimatePresence>

      {/* DYNAMIC BACKGROUND LIGHTING */}
      <motion.div style={{ y: yBackground }} className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen" />
      </motion.div>

      {/* --- MAIN HEADER --- */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-void/80 backdrop-blur-md border-b border-white/5 shadow-lg"
      >
        <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_10px_#00f0ff]"></div>
             <div className="flex flex-col leading-none">
               <span className="font-display font-bold tracking-widest text-sm text-white">SREESHA NARASIMHAN</span>
               <span className="font-tech text-[10px] text-gray-400 tracking-[0.2em] hidden sm:block">SYSTEM INTERFACE // V2.5</span>
             </div>
        </div>
        
        <button 
            onClick={onExport}
            disabled={isExporting}
            className="group relative px-6 py-2.5 bg-neon-purple/10 border border-neon-purple/50 text-neon-purple font-tech text-xs font-bold tracking-widest hover:bg-neon-purple hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden rounded-sm"
        >
            <span className="relative z-10 flex items-center gap-2">
                {isExporting ? 'GENERATING...' : 'DOWNLOAD PDF'}
                {!isExporting && <Download size={14} className="group-hover:animate-bounce" />}
            </span>
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-neon-purple/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {/* Scanline */}
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-scan-fast pointer-events-none"></div>
        </button>
      </motion.header>

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-3 mb-6"
          >
             <div className="h-[1px] w-12 bg-neon-cyan/50"></div>
             <span className="font-tech text-neon-cyan tracking-[0.4em] text-xs">SYSTEM INITIALIZED</span>
             <div className="h-[1px] w-12 bg-neon-cyan/50"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            {data.name.split(' ')[0]}<br />
            <span className="text-4xl md:text-6xl font-thin tracking-widest text-neon-lavender/80">{data.name.split(' ')[1]}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-lg md:text-xl font-sans tracking-wide max-w-2xl text-gray-300 leading-relaxed mb-12"
          >
            {data.title.toUpperCase()} // <span className="text-neon-blue">AI ARCHITECT</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5 }}
            className="flex gap-6"
          >
             <ArcReactorButton onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth'})}>
                INITIATE
             </ArcReactorButton>
             <ArcReactorButton onClick={onExport} isLoading={isExporting} className="opacity-80">
                DOWNLOAD DATA
             </ArcReactorButton>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
        </motion.div>
      </section>

      {/* --- BIO & COMPETENCIES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Bio Text */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <Cpu className="text-neon-purple" size={32} />
                    <h2 className="text-3xl font-display font-bold tracking-wider">CORE IDENTITY</h2>
                </div>
                <p className="text-gray-400 leading-8 font-sans text-lg border-l-2 border-neon-purple/30 pl-6">
                    {data.summary}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded border border-white/5">
                        <div className="text-xs text-neon-blue tracking-widest mb-1">LOCATION</div>
                        <div>{data.contact.location}</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded border border-white/5">
                        <div className="text-xs text-neon-blue tracking-widest mb-1">CONTACT</div>
                        <div className="text-sm truncate">{data.contact.email}</div>
                    </div>
                </div>
            </motion.div>

            {/* Skills Radial */}
            <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                {/* Dynamically parsing skills for visuals */}
                <SkillCircle label="PYTHON" percentage={95} />
                <SkillCircle label="AI / ML" percentage={90} />
                <SkillCircle label="REACT" percentage={85} />
                <SkillCircle label="DATA SCI" percentage={88} />
                <SkillCircle label="PROMPTING" percentage={92} />
                <SkillCircle label="FULL STACK" percentage={80} />
            </motion.div>
        </div>
      </section>

      {/* --- PROJECTS / ARCHITECTURE --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative">
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-neon-cyan to-transparent"></div>
         
         <div className="mb-16 pl-6">
             <h2 className="text-4xl font-display font-bold tracking-wider mb-2">SYSTEM ARCHITECTURE</h2>
             <span className="font-tech text-sm text-neon-blue opacity-70">DEPLOYED PROJECTS & PROTOTYPES</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((proj, idx) => (
                <HoloCard key={idx} className="min-h-[250px] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <Terminal className="text-neon-cyan" size={24} />
                            <span className="font-mono text-xs text-gray-500">v1.{idx}.0</span>
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">{proj.title}</h3>
                        <p className="text-gray-400 font-sans text-sm leading-relaxed">{proj.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
                        <span className="px-2 py-1 text-[10px] border border-neon-purple/50 text-neon-purple rounded bg-neon-purple/10">RESEARCH</span>
                        <span className="px-2 py-1 text-[10px] border border-neon-blue/50 text-neon-blue rounded bg-neon-blue/10">DEVELOPMENT</span>
                    </div>
                </HoloCard>
            ))}
         </div>
      </section>

      {/* --- CERTIFICATIONS (COURSE KEYS) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16 justify-center">
            <Award className="text-neon-cyan" size={32} />
            <h2 className="text-3xl font-display font-bold tracking-wider">ACCREDITATIONS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.certifications.map((cert, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               onClick={() => setSelectedCert(cert)}
               className="group cursor-pointer"
             >
                <div className="relative bg-void-light border border-white/10 rounded-lg p-1 hover:border-neon-cyan/50 transition-colors duration-300 h-full">
                  <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  
                  {/* Key Design */}
                  <div className="relative h-full bg-black/40 p-4 flex flex-col gap-3 rounded overflow-hidden">
                      {/* Top Bar */}
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2 text-neon-cyan">
                              <Key size={16} />
                              <span className="font-tech text-[10px] tracking-widest">ACCESS KEY 0{idx+1}</span>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-gray-700 group-hover:bg-neon-cyan shadow-[0_0_5px_transparent] group-hover:shadow-[0_0_10px_#00f0ff] transition-all"></div>
                      </div>

                      <h3 className="font-display font-bold text-lg leading-tight text-white group-hover:text-neon-cyan transition-colors">
                        {cert.title}
                      </h3>
                      
                      <div className="mt-auto pt-2 flex justify-between items-end">
                          <span className="text-xs text-gray-500 font-mono">{cert.issuer}</span>
                          <span className="text-[10px] font-bold text-neon-purple bg-neon-purple/10 px-2 py-1 rounded border border-neon-purple/20">
                            VIEW CERT
                          </span>
                      </div>

                      {/* Hover Scan Line */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 group-hover:animate-scan-vertical"></div>
                  </div>
                </div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* --- EXPERIENCE TIMELINE --- */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
         <h2 className="text-3xl font-display font-bold text-center mb-16 tracking-widest">
            EXECUTION <span className="text-neon-purple">LOG</span>
         </h2>

         <div className="space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
             {data.experience.map((exp, idx) => (
                 <motion.div 
                    key={idx} 
                    className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                 >
                    {/* Date Bubble */}
                    <div className="w-full md:w-1/2 flex justify-start md:justify-end md:px-8">
                       {idx % 2 !== 0 && (
                          <div className="hidden md:block text-right">
                              <div className="text-2xl font-display font-bold text-neon-purple">{exp.duration}</div>
                              <div className="text-sm text-gray-500 font-tech">{exp.company}</div>
                          </div>
                       )}
                       {/* Mobile view text */}
                       <div className="block md:hidden">
                          <span className="text-neon-purple font-mono text-sm">{exp.duration}</span>
                       </div>
                    </div>

                    {/* Central Node */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-neon-cyan rounded-full shadow-[0_0_15px_#00f0ff] z-10"></div>

                    {/* Content Card */}
                    <div className="w-full md:w-1/2 md:px-8">
                        {idx % 2 === 0 && (
                             <div className="hidden md:block mb-4">
                                <div className="text-2xl font-display font-bold text-neon-purple">{exp.duration}</div>
                                <div className="text-sm text-gray-500 font-tech">{exp.company}</div>
                             </div>
                        )}
                        <HoloCard className="p-6">
                            <h4 className="text-xl font-bold text-white mb-2">{exp.role}</h4>
                            <div className="md:hidden text-xs text-gray-500 mb-4">{exp.company}</div>
                            <ul className="text-sm text-gray-400 space-y-2">
                                {exp.points.map((pt, pIdx) => (
                                    <li key={pIdx} className="flex gap-2">
                                        <span className="text-neon-cyan mt-1">›</span> {pt}
                                    </li>
                                ))}
                            </ul>
                        </HoloCard>
                    </div>
                 </motion.div>
             ))}
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="text-center py-12 border-t border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent pointer-events-none"></div>
         <p className="font-tech text-xs text-gray-600 tracking-[0.3em]">
            SYSTEM TERMINATED // SESSION END
         </p>
         <div className="mt-4 flex justify-center gap-6 opacity-50">
            <Globe size={16} />
            <ShieldCheck size={16} />
            <Database size={16} />
         </div>
      </footer>
    </div>
  );
};

export default PortfolioExperience;