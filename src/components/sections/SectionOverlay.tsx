import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { SectionContent } from '@/data/content';
import AboutSection from './AboutSection';
import WorksSection from './WorksSection';
import PhilosophySection from './PhilosophySection';
import ExperimentsSection from './ExperimentsSection';
import ContactSection from './ContactSection';

interface SectionOverlayProps {
  section: SectionContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SectionOverlay({ section, isOpen, onClose }: SectionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap for accessibility
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
    
    // Focus trap
    if (event.key === 'Tab' && overlayRef.current) {
      const focusableElements = overlayRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      // Entrance animation
      gsap.set(overlayRef.current, { display: 'block' });
      
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
      
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power4.out' }
      );

      // Focus first element
      setTimeout(() => firstFocusableRef.current?.focus(), 100);
      
      // Add keyboard listener
      document.addEventListener('keydown', handleKeyDown);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Exit animation
      gsap.to(contentRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: 'none' });
          }
        },
      });
      
      // Remove keyboard listener
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!section) return null;

  const renderSection = () => {
    switch (section.id) {
      case 'aboutSection':
        return <AboutSection section={section} />;
      case 'worksSection':
        return <WorksSection section={section} />;
      case 'philosophySection':
        return <PhilosophySection section={section} />;
      case 'experimentsSection':
        return <ExperimentsSection section={section} />;
      case 'contactSection':
        return <ContactSection section={section} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] hidden"
      style={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="section-title"
    >
      {/* White background */}
      <div className="absolute inset-0 bg-white" />

      {/* Close button */}
      <button
        ref={firstFocusableRef}
        onClick={onClose}
        className="fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center
                   text-black/30 hover:text-black/80 transition-colors duration-300
                   focus:outline-none focus:ring-2 focus:ring-black/20 rounded-full"
        aria-label="Close section"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Content container */}
      <div
        ref={contentRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {renderSection()}
      </div>

      {/* ESC hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <p className="font-serif text-[10px] text-black/20 tracking-[0.3em] uppercase">
          Press ESC to close
        </p>
      </div>
    </div>
  );
}
