import React, { useState } from 'react';
import { ResumeData } from '../types';
import { CyberButton, CyberPanel, SkillBar, StatCard } from './GameUI';
import { 
  User, Code, Terminal, Cpu, Award, MapPin, 
  Briefcase, Zap, Shield, Download, Crosshair, Lock
} from 'lucide-react';

interface GameDashboardProps {
  data: ResumeData;
  onExport: () => void;
  isExporting: boolean;
}

const GameDashboard: React.FC<GameDashboardProps> = ({ data, onExport, isExporting }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'missions' | 'log'>('overview');

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen p-4 md:p-8 flex flex-col gap-6 relative z-10">
      
      {/* HUD HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-cyber-dark/80 backdrop-blur border-b border-cyber-purple/30 p-4 sticky top-0 z-50 clip-corner">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyber-purple/20 border border-cyber-purple flex items-center justify-center animate-pulse">
            <User className="text-cyber-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-widest uppercase glitch-text">
              {data.name}
            </h1>
            <div className="flex items-center gap-2 text-cyber-blue font-mono text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              ONLINE // {data.title}
            </div>
          </div>
        </div>

        {/* TOP STATS */}
        <div className="flex gap-4 hidden md:flex">
          <StatCard label="Rank" value="ELITE" icon={<Award size={16}/>} />
          <StatCard label="XP Level" value="24" icon={<Zap size={16}/>} />
          <StatCard label="Region" value="IND-TN" icon={<MapPin size={16}/>} />
        </div>

        {/* ACTIONS */}
        <CyberButton variant="secondary" onClick={onExport} isLoading={isExporting} icon={<Download size={18} />}>
          EXPORT SAVE
        </CyberButton>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDEBAR - PROFILE & NAV */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          {/* Avatar Panel */}
          <CyberPanel className="flex flex-col items-center text-center">
            <div className="relative w-40 h-40 mb-4 group">
                <div className="absolute inset-0 rounded-full border-2 border-cyber-purple animate-spin-slow opacity-50 border-dashed"></div>
                <div className="absolute inset-2 rounded-full border border-cyber-blue opacity-30"></div>
                <img 
                  src={data.profileImage} 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-full border-4 border-gray-900 group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
                <div className="absolute bottom-0 right-0 bg-black border border-cyber-purple text-cyber-purple text-xs font-bold px-2 py-0.5 rounded">
                  LVL.24
                </div>
            </div>
            
            {/* Navigation Buttons */}
            <nav className="w-full flex flex-col gap-3 mt-4">
              <CyberButton 
                variant={activeTab === 'overview' ? 'primary' : 'ghost'} 
                onClick={() => setActiveTab('overview')}
                className="w-full justify-start text-sm"
                icon={<Shield size={16}/>}
              >
                OVERVIEW
              </CyberButton>
              <CyberButton 
                variant={activeTab === 'missions' ? 'primary' : 'ghost'} 
                onClick={() => setActiveTab('missions')}
                className="w-full justify-start text-sm"
                icon={<Crosshair size={16}/>}
              >
                MISSIONS (PROJECTS)
              </CyberButton>
              <CyberButton 
                variant={activeTab === 'log' ? 'primary' : 'ghost'} 
                onClick={() => setActiveTab('log')}
                className="w-full justify-start text-sm"
                icon={<Terminal size={16}/>}
              >
                CAMPAIGN LOG (EXP)
              </CyberButton>
            </nav>
          </CyberPanel>

          {/* Contact Panel */}
          <CyberPanel title="COMMS LINK" className="text-sm space-y-3 font-mono">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-500">EMAIL</span>
              <span className="text-cyber-blue text-right break-all">{data.contact.email}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-500">LOC</span>
              <span className="text-white">{data.contact.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">LINK</span>
              <span className="text-cyber-purple">{data.contact.linkedin}</span>
            </div>
          </CyberPanel>
        </aside>

        {/* CENTER/RIGHT CONTENT */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Summary */}
              <CyberPanel title="BIO_DATA">
                <p className="text-gray-300 leading-relaxed font-sans text-lg">
                  <span className="text-cyber-purple font-bold">system_msg:</span> {data.summary}
                </p>
              </CyberPanel>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills Section */}
                <CyberPanel title="ABILITY TREE" className="h-full">
                  <div className="space-y-6">
                    {data.skills.map((cat, idx) => (
                      <div key={idx}>
                        <h3 className="flex items-center gap-2 text-cyber-blue mb-3 font-display uppercase text-sm">
                          <Cpu size={14} /> {cat.category}
                        </h3>
                        {cat.skills.map((skill, sIdx) => {
                            // Mocking level data based on text for visual flair
                            const isAdvanced = skill.includes('Advanced') || skill.includes('Certified');
                            const level = isAdvanced ? 95 : 75;
                            return <SkillBar key={sIdx} label={skill.split('(')[0]} level={level} />;
                        })}
                      </div>
                    ))}
                  </div>
                </CyberPanel>

                {/* Achievements / Certs */}
                <CyberPanel title="ACHIEVEMENTS UNLOCKED" className="h-full">
                  <div className="space-y-4">
                    {data.certifications.map((cert, idx) => (
                      <div key={idx} className="flex gap-4 items-center bg-gray-900/50 p-3 border-l-2 border-cyber-purple hover:bg-gray-800 transition-colors">
                        <div className="p-2 bg-black border border-gray-700 rounded-full">
                          <Award className="text-yellow-500" size={20} />
                        </div>
                        <div>
                          <div className="text-white font-bold font-display text-sm uppercase">{cert.title}</div>
                          <div className="text-gray-500 text-xs font-mono">{cert.issuer} | {cert.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CyberPanel>
              </div>
            </>
          )}

          {/* TAB: MISSIONS (Projects) */}
          {activeTab === 'missions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {data.projects.map((proj, idx) => (
                <CyberPanel key={idx} title={`MISSION_0${idx + 1}`} className="group hover:border-cyber-blue/50 transition-colors">
                  <div className="h-32 bg-gray-900 mb-4 border border-gray-800 flex items-center justify-center relative overflow-hidden">
                     {/* Decorative grid inside card */}
                     <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                     <Terminal size={48} className="text-gray-700 group-hover:text-cyber-blue transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-gray-400 text-sm">{proj.description}</p>
                  <div className="mt-4 flex gap-2">
                    <CyberButton variant="ghost" className="text-xs py-2 px-4 border border-gray-700">View Intel</CyberButton>
                  </div>
                </CyberPanel>
              ))}
              
              {/* Locked Mission Placeholders */}
              {[1, 2].map((_, i) => (
                <div key={i} className="opacity-50 grayscale pointer-events-none">
                  <CyberPanel title="LOCKED">
                    <div className="h-32 flex flex-col items-center justify-center text-gray-600">
                      <Lock size={32} className="mb-2" />
                      <span className="font-display text-xs">REQUIREMENT: LVL 30</span>
                    </div>
                  </CyberPanel>
                </div>
              ))}
            </div>
          )}

          {/* TAB: LOG (Experience) */}
          {activeTab === 'log' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-gray-800 hover:border-cyber-purple transition-colors group">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-gray-600 rounded-full group-hover:border-cyber-purple group-hover:bg-cyber-purple/20 transition-all"></div>
                  
                  <CyberPanel className="mb-2">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b border-gray-800 pb-2">
                      <div>
                        <h3 className="text-lg font-display font-bold text-white group-hover:text-cyber-purple transition-colors">
                          {exp.role}
                        </h3>
                        <div className="text-cyber-blue font-mono text-sm flex items-center gap-2">
                          <Briefcase size={12} /> {exp.company}
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-xs font-mono rounded">
                        {exp.duration}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 bg-cyber-purple"></span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </CyberPanel>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer Decoration */}
      <footer className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-600 font-mono text-xs">
         SYSTEM STATUS: OPTIMAL // UI VERSION 2.5 // © {new Date().getFullYear()} SREESHA NARASIMHAN
      </footer>
    </div>
  );
};

export default GameDashboard;