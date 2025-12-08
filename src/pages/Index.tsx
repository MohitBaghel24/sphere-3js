import { useEffect, useState } from 'react';
import TheEye from '@/components/TheEye';
import OverlayManager from '@/components/OverlayManager';
import SideMenu from '@/components/SideMenu';
import FilmGrain from '@/components/FilmGrain';
import { useStore, RING_SECTIONS, SECTION_TITLES } from '@/store/useStore';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isZoomed, hoveredRing, currentStep } = useStore();

  useEffect(() => {
    // Fade in after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get hovered section name for display
  const hoveredSection = hoveredRing !== null ? RING_SECTIONS[hoveredRing] : null;
  const hoveredSectionTitle = hoveredSection ? SECTION_TITLES[hoveredSection] : null;
  
  // Get active step section name
  const activeStepSection = RING_SECTIONS[currentStep - 1];
  const activeStepTitle = activeStepSection ? SECTION_TITLES[activeStepSection] : null;

  return (
    <main className="relative w-full h-screen overflow-hidden bg-white">
      {/* Three.js Canvas with Spherical Eye */}
      <TheEye />
      
      {/* Side Menu */}
      <SideMenu />
      
      {/* Overlay Manager */}
      <OverlayManager />
      
      {/* Very soft film grain for cinematic luxury feel */}
      <FilmGrain />

      {/* Bottom Tagline */}
      <div 
        className={`
          fixed bottom-[8%] md:bottom-[12%] left-1/2 z-10 pointer-events-none px-4
          transition-all duration-1000 delay-500
          ${isLoaded && !isZoomed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        style={{ transform: 'translateX(-50%)' }}
      >
        <h1 
          className="font-serif text-sm md:text-base font-medium italic text-black/40 text-center select-none"
          style={{ letterSpacing: '0.15em' }}
        >
          peer into the eye of almondgod
        </h1>
      </div>

      {/* Active Ring Indicator */}
      <div 
        className={`
          fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none
          transition-all duration-500
          ${isLoaded && !isZoomed ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {hoveredSectionTitle ? (
          <p 
            className="font-mono text-[10px] md:text-xs text-black/60 uppercase transition-all duration-300"
            style={{ letterSpacing: '0.25em' }}
          >
            {hoveredSectionTitle}
          </p>
        ) : (
          <div className="text-center">
            <p 
              className="font-mono text-[9px] md:text-[10px] text-black/30 uppercase"
              style={{ letterSpacing: '0.2em' }}
            >
              Ring {currentStep} · {activeStepTitle}
            </p>
            <p 
              className="font-serif text-[8px] md:text-[9px] text-black/15 mt-1"
              style={{ letterSpacing: '0.15em' }}
            >
              click to enter
            </p>
          </div>
        )}
      </div>

      {/* Corner branding - Hidden on mobile */}
      <div 
        className={`
          fixed top-8 left-8 z-10 pointer-events-none hidden md:block
          transition-all duration-1000 delay-300
          ${isLoaded && !isZoomed ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <p 
          className="font-serif text-xs text-black/20 tracking-[0.3em] uppercase"
        >
          almondgod
        </p>
      </div>
    </main>
  );
};

export default Index;
