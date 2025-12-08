import { motion, AnimatePresence } from 'framer-motion';
import { useStore, SectionId, SECTION_TITLES } from '@/store/useStore';
import AboutSection from '@/sections/AboutSection';
import WorksSection from '@/sections/WorksSection';
import PhilosophySection from '@/sections/PhilosophySection';
import ExperimentsSection from '@/sections/ExperimentsSection';
import ContactSection from '@/sections/ContactSection';
import { useEffect, useCallback } from 'react';

// Section component mapping
const SECTION_COMPONENTS: Record<Exclude<SectionId, null>, React.ComponentType> = {
  about: AboutSection,
  works: WorksSection,
  philosophy: PhilosophySection,
  experiments: ExperimentsSection,
  contact: ContactSection,
};

// Animation variants - smooth fade with scale
const overlayVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.4, // Wait for camera zoom
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.5,
    },
  },
};

export default function OverlayManager() {
  const { activeSection, closeSection, currentStep } = useStore();
  
  // Close on ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && activeSection) {
      closeSection();
    }
  }, [activeSection, closeSection]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  // Lock body scroll when overlay is open
  useEffect(() => {
    if (activeSection) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeSection]);
  
  const handleClose = () => {
    closeSection();
  };
  
  const SectionComponent = activeSection ? SECTION_COMPONENTS[activeSection] : null;
  
  return (
    <AnimatePresence mode="wait">
      {activeSection && SectionComponent && (
        <motion.div
          key={activeSection}
          id="sectionOverlay"
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          {/* Transparent backdrop with blur */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
          
          {/* Close button */}
          <button
            id="sectionCloseButton"
            onClick={handleClose}
            className="fixed top-8 right-8 z-50 w-14 h-14 flex items-center justify-center
                       text-black/30 hover:text-black transition-all duration-300
                       group border border-black/10 rounded-full hover:border-black/30
                       hover:scale-110 bg-white/50 backdrop-blur-sm"
            aria-label="Close section"
          >
            <span className="text-2xl font-light transform transition-transform duration-300 group-hover:rotate-90">
              ✕
            </span>
          </button>
          
          {/* Section title indicator */}
          <div className="fixed top-8 left-8 z-50">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="font-mono text-[10px] text-black/30 tracking-[0.3em] uppercase">
                Ring {currentStep} / 5
              </span>
              <h2 className="font-serif text-lg text-black/60 tracking-wide mt-1">
                {SECTION_TITLES[activeSection]}
              </h2>
            </motion.div>
          </div>
          
          {/* Section Content - Transparent panel */}
          <div 
            className="section-panel absolute inset-0 overflow-y-auto overflow-x-hidden"
            style={{ 
              background: 'transparent',
              backdropFilter: 'blur(6px)',
            }}
          >
            <SectionComponent />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
