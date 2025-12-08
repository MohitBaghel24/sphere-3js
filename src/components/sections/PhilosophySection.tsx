import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContent } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

interface PhilosophySectionProps {
  section: SectionContent;
}

export default function PhilosophySection({ section }: PhilosophySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.philosophy-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Philosophy statements
      gsap.utils.toArray('.philosophy-statement').forEach((el) => {
        const element = el as HTMLElement;
        
        gsap.fromTo(
          element,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate the divider line
        const divider = element.querySelector('.statement-divider');
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0, transformOrigin: 'left' },
            {
              scaleX: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Quote animation - blur to clear
      const quoteEl = document.querySelector('.philosophy-quote');
      if (quoteEl) {
        gsap.fromTo(
          quoteEl,
          { opacity: 0, filter: 'blur(10px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteEl,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    // Animate film grain
    if (grainRef.current) {
      const grainAnimation = gsap.to(grainRef.current, {
        backgroundPosition: '100% 100%',
        duration: 8,
        repeat: -1,
        ease: 'none',
      });
      
      return () => {
        ctx.revert();
        grainAnimation.kill();
      };
    }

    return () => ctx.revert();
  }, []);

  const statements = section.philosophyStatements || [];

  return (
    <div ref={containerRef} className="min-h-screen bg-white relative">
      {/* Subtle film grain overlay */}
      <div
        ref={grainRef}
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Header */}
      <div className="philosophy-header pt-32 pb-16 px-8 text-center">
        <p className="font-serif text-black/30 text-xs tracking-[0.3em] uppercase mb-4">
          Manifesto
        </p>
        <h1
          id="section-title"
          className="font-serif font-light text-black/90"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '0.05em' }}
        >
          {section.subtitle}
        </h1>
      </div>

      {/* Statements */}
      <div className="max-w-[900px] mx-auto px-8 pb-24">
        {statements.map((statement, i) => (
          <div
            key={i}
            className="philosophy-statement py-12 md:py-16"
          >
            {/* Number */}
            <span
              className="font-mono text-black/20 text-xs tracking-widest mb-4 block"
            >
              {statement.number}
            </span>

            {/* Title */}
            <h2
              className="font-serif font-light text-black/90 mb-4"
              style={{ fontSize: 'clamp(24px, 4vw, 40px)', letterSpacing: '0.02em' }}
            >
              {statement.title}
            </h2>

            {/* Body */}
            <p
              className="font-serif text-black/50 max-w-2xl"
              style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', lineHeight: 1.9 }}
            >
              {statement.body}
            </p>

            {/* Divider */}
            <div className="statement-divider h-px bg-black/10 mt-12 md:mt-16" />
          </div>
        ))}
      </div>

      {/* Quote */}
      {section.quote && (
        <div className="py-24 px-8">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote
              className="philosophy-quote font-serif italic text-black/60"
              style={{ fontSize: 'clamp(24px, 4vw, 40px)', lineHeight: 1.5 }}
            >
              "{section.quote}"
            </blockquote>
            {section.quoteAuthor && (
              <cite
                className="font-serif text-black/30 text-sm tracking-[0.2em] mt-8 block not-italic uppercase"
              >
                — {section.quoteAuthor}
              </cite>
            )}
          </div>
        </div>
      )}

      {/* Bottom spacer */}
      <div className="h-32" />
    </div>
  );
}
