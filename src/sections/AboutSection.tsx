import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sections } from '@/data/content';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the About section data from content.ts
  const section = sections[0];
  const paragraphs = section?.description?.split('\n\n') || [];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Simple fade-in animations for text elements
      gsap.utils.toArray('.about-text').forEach((el, i) => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        gsap.to(element, {
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'power2.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!section) {
    return <div className="text-black text-center p-8">Loading...</div>;
  }

  return (
    <div ref={containerRef} className="w-full bg-white min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-16 px-6 md:px-8 text-center bg-white">
        <h1 className="about-text font-serif text-4xl md:text-6xl text-black font-light mb-4">
          {section.heroTitle || 'About'}
        </h1>
        <div className="flex justify-center my-6">
          <div className="w-12 h-1 bg-black" />
        </div>
        <p className="about-text font-serif text-lg md:text-2xl text-black mb-8">
          {section.heroSubtitle || 'A study in perception, creation, and systems.'}
        </p>
      </div>

      {/* Content Section */}
      <div className="w-full px-6 md:px-8 py-12 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Paragraphs */}
          {paragraphs && paragraphs.length > 0 ? (
            paragraphs.map((paragraph, i) => (
              <div key={i} className="about-text">
                <p className="font-serif text-base md:text-lg text-black leading-relaxed">
                  {paragraph.trim()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-black">No content available</p>
            </div>
          )}

          {/* Divider */}
          <div className="my-12 h-px bg-black/15" />

          {/* Achievement Statistics */}
          {section.items && section.items.length > 0 && (
            <div className="mt-12">
              <h2 className="about-text font-serif text-2xl md:text-4xl text-black text-center font-light mb-12">
                Our Impact & Presence
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.items.map((item, i) => (
                  <div key={i} className="about-text text-center">
                    <h3 className="font-serif text-4xl md:text-5xl text-black font-light mb-4">
                      {item.title}
                    </h3>
                    <p className="font-serif text-sm md:text-base text-black font-semibold mb-2">
                      {item.description.split(' - ')[0]}
                    </p>
                    {item.description.includes(' - ') && (
                      <p className="font-serif text-xs md:text-sm text-black/70">
                        {item.description.split(' - ')[1]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
