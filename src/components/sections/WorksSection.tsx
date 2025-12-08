import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContent, WorkItem } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

interface WorksSectionProps {
  section: SectionContent;
}

interface WorkModalProps {
  work: WorkItem;
  onClose: () => void;
}

function WorkModal({ work, onClose }: WorkModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-8"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        ref={contentRef}
        className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto 
                   shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Left: Media */}
        <div className="md:w-1/2 aspect-[3/4] bg-black/5 flex-shrink-0">
          <img
            src={work.thumbnail}
            alt={work.title}
            className="w-full h-full object-cover filter grayscale"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                       text-black/30 hover:text-black/80 transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Year */}
          <p className="font-serif text-black/30 text-xs tracking-[0.3em] uppercase mb-4">
            {work.year}
          </p>

          {/* Title */}
          <h2
            className="font-serif font-light text-black/90 mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '0.02em' }}
          >
            {work.title}
          </h2>

          {/* Summary */}
          <p
            className="font-serif text-black/60 mb-8"
            style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.8 }}
          >
            {work.summary}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {work.techStack.map((tech, i) => (
              <span
                key={i}
                className="font-mono text-[10px] text-black/40 border border-black/10 
                           px-3 py-1 tracking-wider uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorksSection({ section }: WorksSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.works-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Grid items stagger animation
      gsap.utils.toArray('.work-card').forEach((el, i) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el as Element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: (i % 2) * 0.15,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const works = section.works || [];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <div className="works-header pt-32 pb-16 px-8 text-center">
        <p className="font-serif text-black/30 text-xs tracking-[0.3em] uppercase mb-4">
          {section.subtitle}
        </p>
        <h1
          id="section-title"
          className="font-serif font-light text-black/90"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '0.05em' }}
        >
          {section.title}
        </h1>
        <p
          className="font-serif text-black/50 mt-6 max-w-lg mx-auto"
          style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.8 }}
        >
          {section.description}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {works.map((work, i) => (
            <div
              key={work.id}
              className="work-card group cursor-pointer"
              onClick={() => setSelectedWork(work)}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden bg-black/5 mb-6">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-full object-cover filter grayscale 
                             group-hover:grayscale-0 group-hover:scale-105
                             transition-all duration-700"
                />
              </div>

              {/* Info */}
              <div className="relative overflow-hidden">
                <h3
                  className="font-serif font-light text-black/80 
                             group-hover:text-black
                             transform group-hover:-translate-y-1 transition-all duration-300"
                  style={{ fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: '0.02em' }}
                >
                  {work.title}
                </h3>
                <p
                  className="font-serif text-black/40 mt-2 
                             opacity-0 group-hover:opacity-100 
                             transform translate-y-2 group-hover:translate-y-0
                             transition-all duration-300"
                  style={{ fontSize: 'clamp(12px, 1.2vw, 14px)' }}
                >
                  {work.year} — {work.techStack.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </div>
  );
}
