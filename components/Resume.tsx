import React, { forwardRef } from 'react';
import { ResumeData } from '../types';
import { Mail, MapPin, Linkedin, Code, Brain, Wrench, Award, GraduationCap, Briefcase, FileText } from 'lucide-react';

interface ResumeProps {
  data: ResumeData;
}

const Resume = forwardRef<HTMLDivElement, ResumeProps>(({ data }, ref) => {
  return (
    <div className="flex justify-center p-4 print:p-0">
      {/* Wrapper for shadow - separates visual depth from captured content */}
      <div className="shadow-2xl print:shadow-none">
        
        {/* Actual Resume Content - Captured by ref */}
        <div 
          ref={ref} 
          className="w-[210mm] min-h-[297mm] bg-white text-black flex flex-col md:flex-row overflow-hidden print:w-full print:min-h-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          
          {/* LEFT COLUMN (Sidebar) */}
          <aside className="w-full md:w-[35%] bg-black text-white p-8 flex flex-col gap-6 relative overflow-hidden">
              {/* Decorative background shapes */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-900 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-800 rounded-full blur-3xl opacity-20 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

              {/* Profile Image & Name Section */}
              <div className="relative z-10 text-center md:text-left flex flex-col gap-4">
                  
                  {data.profileImage && (
                    <div className="flex justify-center md:justify-start">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-2xl group ring-2 ring-primary-500/50">
                        <img 
                            src={data.profileImage} 
                            alt={data.name} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                      </div>
                    </div>
                  )}

                  <div>
                      <h1 className="font-display text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 text-white">
                          {data.name.split(' ')[0]} <br />
                          <span className="text-primary-400">{data.name.split(' ').slice(1).join(' ')}</span>
                      </h1>
                      <p className="text-white text-sm font-bold tracking-wide uppercase mt-2 border-t border-neutral-700 pt-3">
                          {data.title}
                      </p>
                  </div>
              </div>

              {/* Contact Info */}
              <div className="relative z-10">
                  <h3 className="text-primary-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-8 h-[3px] bg-primary-500"></span> Contact
                  </h3>
                  <div className="flex flex-col gap-3 text-sm text-white font-medium">
                      <div className="flex items-center gap-3 group">
                          <div className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-primary-400 group-hover:text-white transition-colors">
                              <Mail size={16} strokeWidth={2.5} />
                          </div>
                          <span className="break-all">{data.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-3 group">
                          <div className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-primary-400 group-hover:text-white transition-colors">
                              <MapPin size={16} strokeWidth={2.5} />
                          </div>
                          <span>{data.contact.location}</span>
                      </div>
                      <div className="flex items-center gap-3 group">
                          <div className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-primary-400 group-hover:text-white transition-colors">
                              <Linkedin size={16} strokeWidth={2.5} />
                          </div>
                          <span className="text-xs">{data.contact.linkedin}</span>
                      </div>
                  </div>
              </div>

              {/* Education */}
              <div className="relative z-10">
                  <h3 className="text-primary-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-8 h-[3px] bg-primary-500"></span> Education
                  </h3>
                  <div className="bg-neutral-900/90 p-4 rounded-xl backdrop-blur-sm border border-neutral-700">
                      <div className="flex items-center gap-2 mb-2 text-white font-bold">
                          <GraduationCap size={18} className="text-primary-500" strokeWidth={2.5} />
                          <span>B.Tech AI & DS</span>
                      </div>
                      <p className="text-white font-medium text-xs mb-1">{data.education.institution}</p>
                      <p className="text-neutral-300 font-medium text-[10px] uppercase tracking-wider mb-3">{data.education.location}</p>
                      <ul className="text-xs text-white font-medium space-y-2 list-disc pl-3 marker:text-primary-500">
                          {data.education.details.map((detail, idx) => (
                              <li key={idx}>{detail.replace('Current Pursuit:', '').replace('Key Focus:', '').trim()}</li>
                          ))}
                      </ul>
                  </div>
              </div>

              {/* Skills */}
              <div className="relative z-10 flex-grow">
                  <h3 className="text-primary-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-8 h-[3px] bg-primary-500"></span> Expertise
                  </h3>
                  <div className="space-y-4">
                      {data.skills.map((cat, idx) => (
                          <div key={idx}>
                              <h4 className="text-white text-xs font-bold mb-2 flex items-center gap-2">
                                  {idx === 0 && <Code size={14} className="text-primary-300" strokeWidth={3}/>}
                                  {idx === 1 && <Brain size={14} className="text-primary-300" strokeWidth={3}/>}
                                  {idx === 2 && <Wrench size={14} className="text-primary-300" strokeWidth={3}/>}
                                  {cat.category}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                  {cat.skills.map((skill, sIdx) => (
                                      <span key={sIdx} className="px-2 py-1 bg-neutral-800 text-white font-semibold text-[10px] rounded border border-neutral-600 hover:border-primary-500 hover:bg-neutral-700 transition-colors">
                                          {skill}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Languages */}
              <div className="relative z-10 mb-4">
                  <h3 className="text-primary-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-8 h-[3px] bg-primary-500"></span> Languages
                  </h3>
                  <div className="text-sm text-white font-bold">
                      {data.languages.join(' • ')}
                  </div>
              </div>

          </aside>

          {/* RIGHT COLUMN (Main Content) */}
          <main className="flex-1 p-8 md:p-10 bg-white relative">
              {/* Watermark/Texture */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none text-primary-900">
                  <Brain size={400} />
              </div>

              {/* Summary */}
              <section className="mb-8">
                  <h2 className="font-display text-xl text-black font-extrabold mb-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-100 text-primary-800 flex items-center justify-center border border-primary-200">
                          <FileText size={20} strokeWidth={2.5} />
                      </div>
                      Profile Summary
                  </h2>
                  <p className="text-black text-sm leading-relaxed text-justify border-l-4 border-primary-400 pl-4 font-semibold">
                      {data.summary}
                  </p>
              </section>

              {/* Experience */}
              <section className="mb-8">
                  <h2 className="font-display text-xl text-black font-extrabold mb-6 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-100 text-primary-800 flex items-center justify-center border border-primary-200">
                          <Briefcase size={20} strokeWidth={2.5} />
                      </div>
                      Professional Experience
                  </h2>
                  <div className="space-y-6 relative before:absolute before:left-[5px] before:top-2 before:h-full before:w-[3px] before:bg-neutral-200">
                      {data.experience.map((exp, idx) => (
                          <div key={idx} className="relative pl-6 group">
                              {/* Timeline Dot */}
                              <div className="absolute left-[0px] top-1.5 w-3.5 h-3.5 rounded-full bg-neutral-600 border-2 border-white group-hover:bg-primary-600 transition-colors z-10 shadow-sm"></div>
                              
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                  <h3 className="text-md font-black text-black group-hover:text-primary-900 transition-colors uppercase tracking-tight">
                                      {exp.role}
                                  </h3>
                                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-300">
                                      {exp.duration}
                                  </span>
                              </div>
                              <h4 className="text-sm font-extrabold text-primary-700 mb-2">{exp.company}</h4>
                              <ul className="text-sm text-black space-y-1 list-disc pl-4 marker:text-black font-medium">
                                  {exp.points.map((point, pIdx) => (
                                      <li key={pIdx}>{point}</li>
                                  ))}
                              </ul>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Projects */}
              <section className="mb-8">
                  <h2 className="font-display text-xl text-black font-extrabold mb-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center border border-neutral-200">
                          <Brain size={20} strokeWidth={2.5} />
                      </div>
                      Academic Projects
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                      {data.projects.map((proj, idx) => (
                          <div key={idx} className="p-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 hover:shadow-lg transition-all hover:border-primary-400">
                              <h3 className="font-black text-black text-sm mb-1">{proj.title}</h3>
                              <p className="text-black font-medium text-xs leading-relaxed">{proj.description}</p>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Certifications */}
              <section>
                  <h2 className="font-display text-xl text-black font-extrabold mb-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-100 text-primary-800 flex items-center justify-center border border-primary-200">
                          <Award size={20} strokeWidth={2.5} />
                      </div>
                      Certifications & Achievements
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {data.certifications.map((cert, idx) => (
                          <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-white border-2 border-neutral-100 hover:border-primary-300 transition-colors shadow-sm">
                              <div className="mt-1 min-w-[8px] h-[8px] rounded-full bg-primary-600"></div>
                              <div>
                                  <h4 className="text-xs font-black text-black leading-tight mb-1">{cert.title}</h4>
                                  <div className="flex justify-between items-center w-full gap-2">
                                      <span className="text-[10px] text-neutral-600 font-bold">{cert.issuer}</span>
                                      <span className="text-[10px] font-bold text-primary-800 bg-primary-100 px-1.5 py-0.5 rounded border border-primary-200 whitespace-nowrap">{cert.date}</span>
                                  </div>
                                  {cert.score && <div className="mt-1 text-[10px] text-black font-bold">Score: {cert.score}</div>}
                              </div>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Footer tagline */}
              <div className="mt-12 pt-4 border-t-2 border-neutral-200 flex justify-between items-center text-[10px] text-neutral-600 font-bold">
                  <span>AI & Data Science Professional</span>
                  <span className="font-mono text-primary-700 font-black tracking-wider">GEMINI CERTIFIED</span>
              </div>
          </main>
        </div>
      </div>
    </div>
  );
});

Resume.displayName = 'Resume';
export default Resume;