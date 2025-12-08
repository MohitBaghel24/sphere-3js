import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContent, ExperimentItem } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

interface ExperimentsSectionProps {
  section: SectionContent;
}

// Simple particle demo for modal
function ParticleDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-white"
    />
  );
}

// Modal for experiments
interface ExperimentModalProps {
  experiment: ExperimentItem;
  onClose: () => void;
}

function ExperimentModal({ experiment, onClose }: ExperimentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    gsap.to(contentRef.current, {
      scale: 0.95,
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
  }, [onClose]);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(
      contentRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power3.out' }
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-8"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md" />

      {/* Modal */}
      <div
        ref={contentRef}
        className="relative bg-white w-full max-w-3xl aspect-video shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center
                     bg-white/80 text-black/50 hover:text-black/80 transition-colors rounded-full"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 px-4 py-2">
          <h3 className="font-serif text-black/80 text-sm">{experiment.title}</h3>
          <p className="font-mono text-black/40 text-[10px] uppercase tracking-wider">
            {experiment.type}
          </p>
        </div>

        {/* Demo */}
        <ParticleDemo />
      </div>
    </div>
  );
}

export default function ExperimentsSection({ section }: ExperimentsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.experiments-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Cards animation
      gsap.utils.toArray('.experiment-card').forEach((el, i) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 30 },
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
            delay: i * 0.08,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const experiments = section.experiments || [];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <div className="experiments-header pt-32 pb-16 px-8 text-center">
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

      {/* Experiments grid */}
      <div className="max-w-3xl mx-auto px-8 pb-32">
        <div className="space-y-6">
          {experiments.map((experiment, i) => (
            <div
              key={experiment.id}
              className="experiment-card group border border-black/10 hover:border-black/30 
                         transition-colors duration-300 p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  {/* Type badge */}
                  <span
                    className="inline-block font-mono text-[10px] text-black/40 
                               border border-black/10 px-2 py-0.5 tracking-wider uppercase mb-3"
                  >
                    {experiment.type}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-serif font-light text-black/80 group-hover:text-black 
                               transition-colors duration-300 mb-2"
                    style={{ fontSize: 'clamp(20px, 2.5vw, 28px)' }}
                  >
                    {experiment.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-serif text-black/50"
                    style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', lineHeight: 1.7 }}
                  >
                    {experiment.description}
                  </p>
                </div>

                {/* Launch button */}
                <button
                  onClick={() => setSelectedExperiment(experiment)}
                  className="flex-shrink-0 font-serif text-xs tracking-[0.2em] uppercase
                             text-black/40 border border-black/20 
                             hover:border-black/60 px-4 py-2 transition-all duration-300
                             hover:bg-black hover:text-white"
                >
                  Launch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedExperiment && (
        <ExperimentModal
          experiment={selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
        />
      )}
    </div>
  );
}
