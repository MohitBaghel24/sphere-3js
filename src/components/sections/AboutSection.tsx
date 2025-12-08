import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContent } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  section: SectionContent;
}

export default function AboutSection({ section }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        '.about-hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.about-hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );

      // Content paragraphs scroll animation
      gsap.utils.toArray('.about-paragraph').forEach((el, i) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el as Element,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Timeline items
      gsap.utils.toArray('.timeline-item').forEach((el, i) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el as Element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const paragraphs = section.description?.split('\n\n') || [];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-8 py-24"
      >
        <h1
          id="section-title"
          className="about-hero-title font-serif font-light text-black/90 text-center mb-6"
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            letterSpacing: '0.08em',
            lineHeight: 1.1,
          }}
        >
          {section.heroTitle}
        </h1>
        <p
          className="about-hero-subtitle font-serif text-black/50 text-center"
          style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            letterSpacing: '0.15em',
          }}
        >
          {section.heroSubtitle}
        </p>
      </div>

      {/* Content Section */}
      <div
        ref={contentRef}
        className="max-w-[680px] mx-auto px-8 pb-32"
      >
        {/* Divider */}
        <div className="w-24 h-px bg-black/15 mx-auto mb-16" />

        {/* Paragraphs */}
        <div className="space-y-8">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="about-paragraph font-serif text-black/60"
              style={{
                fontSize: 'clamp(16px, 1.8vw, 18px)',
                lineHeight: 1.9,
                letterSpacing: '0.01em',
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Achievement Statistics */}
        {section.items && section.items.length > 0 && (
          <div ref={timelineRef} className="mt-24">
            <h2
              className="font-serif text-black/30 text-xs tracking-[0.3em] uppercase mb-12"
            >
              Key Achievements
            </h2>
            
            {/* Achievement Statistics Grid */}
            <div className="grid gap-12 md:gap-16">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="timeline-item group cursor-pointer border-b border-black/5 pb-8"
                >
                  {/* Statistic Number */}
                  <div className="mb-4">
                    <span
                      className="font-serif text-black/90 font-light block"
                      style={{ 
                        fontSize: 'clamp(36px, 5vw, 48px)',
                        letterSpacing: '0.02em',
                        lineHeight: 1,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <p
                      className="font-serif text-black/70 group-hover:text-black/90 
                                 transition-colors duration-300"
                      style={{ 
                        fontSize: 'clamp(16px, 2vw, 18px)',
                        letterSpacing: '0.01em',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description.split(' - ')[0]}
                    </p>
                    {item.description.includes(' - ') && (
                      <p
                        className="font-serif text-black/50 group-hover:text-black/70 
                                   transition-colors duration-300"
                        style={{ 
                          fontSize: 'clamp(14px, 1.6vw, 16px)',
                          letterSpacing: '0.01em',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.description.split(' - ')[1]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
