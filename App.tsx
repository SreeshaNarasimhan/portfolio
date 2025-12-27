import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { SystemCursor, EnergyField } from './components/CinematicUI';
import Resume from './components/Resume';
import PortfolioExperience from './components/PortfolioExperience';
import { RESUME_CONTENT } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [systemLoaded, setSystemLoaded] = useState(false);

  // Simulate System Boot Sequence
  useEffect(() => {
    const timer = setTimeout(() => setSystemLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPdf = async () => {
    if (!resumeRef.current) return;
    setIsGenerating(true);

    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 210;
      const pdfMinHeight = 297; 
      const canvasRatio = canvas.height / canvas.width;
      const pdfContentHeight = pdfWidth * canvasRatio;
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [pdfWidth, Math.max(pdfContentHeight, pdfMinHeight)]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfContentHeight);
      pdf.save('Sreesha_Narasimhan_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-void min-h-screen relative overflow-hidden text-slate-200">
      
      {/* GLOBAL CINEMATIC ELEMENTS */}
      <SystemCursor />
      <EnergyField />

      {/* Defer loading of the resume for PDF generation until system is loaded to speed up TTI */}
      {systemLoaded && (
        <div className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50">
           <Resume ref={resumeRef} data={RESUME_CONTENT} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!systemLoaded ? (
            /* INTRO SEQUENCE */
            <motion.div 
                key="intro"
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 1 }}
            >
                <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden mb-4">
                    <motion.div 
                        className="h-full bg-neon-cyan shadow-[0_0_15px_#00f0ff]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </div>
                <motion.div 
                    className="font-tech text-neon-purple tracking-[0.5em] text-xs"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                >
                    INITIALIZING KERNEL...
                </motion.div>
            </motion.div>
        ) : (
            /* MAIN EXPERIENCE */
            <motion.div 
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <PortfolioExperience 
                    data={RESUME_CONTENT} 
                    onExport={handleDownloadPdf}
                    isExporting={isGenerating}
                />
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;