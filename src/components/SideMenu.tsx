import { motion, AnimatePresence } from 'framer-motion';
import { useStore, RING_SECTIONS, SECTION_TITLES, SectionId } from '@/store/useStore';
import { Play, Pause, Menu, X } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';
import { useState } from 'react';

const MENU_ITEMS: { id: SectionId; label: string; icon: string }[] = [
  { id: 'about', label: 'About', icon: '○' },
  { id: 'works', label: 'Works', icon: '◐' },
  { id: 'philosophy', label: 'Philosophy', icon: '◑' },
  { id: 'experiments', label: 'Experiments', icon: '◒' },
  { id: 'contact', label: 'Contact', icon: '●' },
];

export default function SideMenu() {
  const { currentStep, openSection, isZoomed, activeSection, isSoundEnabled, toggleSound } = useStore();
  const { startAmbientAudio } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Find active index for sliding dot
  const activeIndex = MENU_ITEMS.findIndex(item => item.id === activeSection);
  
  const handleClick = (id: SectionId, index: number) => {
    // Only allow clicking unlocked sections
    if (index <= currentStep) {
      openSection(id);
      setMobileMenuOpen(false);
    }
  };

  const handleSoundToggle = () => {
    // Always start ambient first, then toggle
    startAmbientAudio();
    toggleSound();
  };
  
  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-[60] w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center md:hidden"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[55] md:hidden flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col gap-6 items-center">
              {MENU_ITEMS.map((item, index) => {
                const isUnlocked = index <= currentStep;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleClick(item.id, index)}
                      disabled={!isUnlocked || isZoomed}
                      className={`
                        text-xl uppercase tracking-[0.15em] font-semibold transition-all
                        ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
                        ${isActive ? 'text-black' : isUnlocked ? 'text-black/60' : 'text-black/20'}
                      `}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Menu - Hidden on mobile */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed left-6 top-1/3 -translate-y-1/2 z-50 hidden md:flex items-stretch"
      >
      {/* Elegant vertical hairline divider */}
      <motion.div 
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.2, 0, 0.1, 1] }}
        className="w-px bg-gradient-to-b from-transparent via-black/15 to-transparent mr-6 origin-center"
        style={{ height: '80%', alignSelf: 'center' }}
      />
      
      {/* Premium sliding micro-dot indicator system */}
      <div className="relative mr-4 flex flex-col justify-center" style={{ width: 8 }}>
        {/* Active indicator dot */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-black shadow-sm"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: activeIndex >= 0 ? 1 : 0,
            scale: activeIndex >= 0 ? 1 : 0.5,
            y: activeIndex >= 0 ? activeIndex * 44 : 0, // 44px = item height + gap
          }}
          transition={{ 
            type: 'spring',
            stiffness: 400,
            damping: 35,
            mass: 0.8,
          }}
        />
        
        {/* Ghost navigation dots */}
        {MENU_ITEMS.map((_, index) => (
          <motion.div
            key={index}
            className={`
              w-1 h-1 rounded-full mb-9 last:mb-0
              transition-all duration-500 ease-out
              ${index <= currentStep 
                ? (index === activeIndex ? 'bg-black/30' : 'bg-black/20') 
                : 'bg-black/8'
              }
            `}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.6 + index * 0.1,
              duration: 0.4,
              ease: [0.2, 0, 0.1, 1]
            }}
          />
        ))}
        
        {/* Subtle connecting line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 -translate-x-1/2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        />
      </div>
      
      <ul className="flex flex-col gap-5">
        {MENU_ITEMS.map((item, index) => {
          const isUnlocked = index <= currentStep;
          const isActive = activeSection === item.id;
          
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6 + index * 0.08,
                ease: [0.2, 0, 0.1, 1]
              }}
              className="relative"
            >
              <motion.button
                onClick={() => handleClick(item.id, index)}
                disabled={!isUnlocked || isZoomed}
                className={`
                  group relative flex items-center gap-4 py-2.5 px-2 transition-all duration-500 ease-out
                  ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
                  ${isActive ? 'opacity-100' : isUnlocked ? 'opacity-60 hover:opacity-100' : 'opacity-25'}
                `}
                whileHover={isUnlocked && !isZoomed ? { 
                  x: 2,
                  transition: { duration: 0.2, ease: 'easeOut' }
                } : {}}
                whileTap={isUnlocked && !isZoomed ? { 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                } : {}}
              >
                {/* Premium typography with editorial feel */}
                <motion.span 
                  className={`
                    text-[12px] uppercase transition-all duration-700 ease-out select-none
                    font-semibold tracking-[0.08em] text-black
                    ${isActive ? 'font-bold tracking-[0.18em]' : ''}
                    ${isUnlocked && !isZoomed ? 'group-hover:tracking-[0.14em]' : ''}
                  `}
                  style={{
                    fontFeatureSettings: '"ss01" on, "ss02" on',
                    letterSpacing: isActive ? '0.18em' : undefined,
                  }}
                >
                  {item.label}
                </motion.span>
                
                {/* Sophisticated active indicator */}
                <motion.div
                  className="relative"
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? 20 : 0 }}
                  transition={{ duration: 0.4, ease: [0.2, 0, 0.1, 1] }}
                >
                  <motion.div
                    className="h-px bg-black/70"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                  
                  {/* Subtle glow on active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 h-px bg-black/30 blur-[0.5px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    />
                  )}
                </motion.div>
                
                {/* Hover underline for unlocked items */}
                {isUnlocked && !isActive && (
                  <motion.div
                    className="absolute bottom-1 left-2 right-2 h-px bg-black/20"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                )}
              </motion.button>
              
              {/* Refined step numbering */}
              {!isUnlocked && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-[8px] text-black/20 mt-1 ml-2 tracking-[0.2em] font-mono"
                  style={{ fontFeatureSettings: '"tnum" on' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>

      {/* Progress indicator - Right Upper Corner - Visible on all screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-50"
      >
        <div className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-1 md:mb-2">
          Progress
        </div>
        <div className="flex gap-0.5 md:gap-1 relative">
          {MENU_ITEMS.map((_, index) => {
            const isActive = index <= currentStep;
            const isCurrentStep = index === currentStep;
            const isPreviousStep = index === currentStep - 1;
            
            return (
              <motion.div
                key={index}
                className="relative"
                layout
              >
                {/* Base segment container */}
                <div className="w-4 h-0.5 md:w-6 md:h-1 rounded-full bg-gray-200 overflow-hidden">
                  {/* Animated fill segment */}
                  <motion.div
                    className="h-full bg-black rounded-full relative"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: isActive ? 1 : 0,
                    }}
                    transition={{ 
                      duration: isCurrentStep ? 0.8 : (isPreviousStep ? 0.4 : 0.3),
                      delay: isCurrentStep ? 0.2 : 0,
                      ease: isCurrentStep ? [0.2, 0, 0.1, 1] : [0.4, 0, 0.2, 1],
                      type: 'tween'
                    }}
                    style={{ 
                      originX: 0,
                      transformOrigin: 'left center'
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Progress percentage */}
        <motion.div 
          className="text-[7px] md:text-[9px] text-gray-400 mt-1 md:mt-1.5 tabular-nums flex items-center gap-1"
          layout
        >
          <motion.span
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -4 }}
            transition={{ 
              duration: 0.5,
              delay: 0.3,
              ease: [0.2, 0, 0.1, 1]
            }}
          >
            {Math.round(((currentStep + 1) / MENU_ITEMS.length) * 100)}%
          </motion.span>
          <span className="opacity-60">complete</span>
        </motion.div>
      </motion.div>

      {/* Play/Pause Button - Bottom Right */}
      <motion.button
        onClick={handleSoundToggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] w-10 h-10 rounded-full bg-black/90 shadow-lg flex items-center justify-center hover:bg-black transition-all duration-300 cursor-pointer"
        aria-label={isSoundEnabled ? 'Pause music' : 'Play music'}
        title={isSoundEnabled ? 'Pause' : 'Play'}
      >
        <motion.div
          key={isSoundEnabled ? 'pause' : 'play'}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
        >
          {isSoundEnabled ? (
            <Pause size={16} className="text-white" fill="white" />
          ) : (
            <Play size={16} className="text-white ml-0.5" fill="white" />
          )}
        </motion.div>
      </motion.button>

      {/* Section Name Floating Display - Only show when NOT in section overlay and NOT on any folder/page */}
      <AnimatePresence>
        {activeSection && !isZoomed && window.location.pathname === '/' && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed left-8 top-[calc(env(safe-area-inset-top,0)+16px)] z-[10000] pointer-events-none select-none about-btn"
            style={{ minWidth: '120px' }}
          >
            <span className="font-mono text-base md:text-lg text-black/20 drop-shadow-sm bg-white/60 rounded-xl px-4 py-1 transition-all">
              {SECTION_TITLES[activeSection]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

