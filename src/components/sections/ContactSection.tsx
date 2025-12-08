import { useEffect, useRef, useState, useCallback, FormEvent } from 'react';
import gsap from 'gsap';
import { SectionContent } from '@/data/content';

interface ContactSectionProps {
  section: SectionContent;
}

export default function ContactSection({ section }: ContactSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Email animation
      gsap.fromTo(
        '.contact-email',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );

      // Social links
      gsap.fromTo(
        '.contact-social',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.6 }
      );

      // Form
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('hello@almondgod.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!submitBtnRef.current) return;

    setIsSubmitting(true);

    // Button animation - collapse to dot
    const btn = submitBtnRef.current;
    const originalWidth = btn.offsetWidth;
    
    gsap.timeline()
      .to(btn, {
        width: 40,
        height: 40,
        borderRadius: '50%',
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(btn, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(btn, {
        width: 200,
        height: 48,
        borderRadius: 0,
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        onComplete: () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormState({ name: '', email: '', message: '' });
          
          setTimeout(() => {
            setIsSubmitted(false);
            gsap.to(btn, {
              width: originalWidth,
              duration: 0.3,
              ease: 'power2.out',
            });
          }, 3000);
        },
      });
  }, []);

  const socialLinks = section.items || [];

  return (
    <div ref={containerRef} className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl w-full px-8 py-24">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <p className="font-serif text-black/30 text-xs tracking-[0.3em] uppercase mb-4">
            Connect
          </p>
          <h1
            id="section-title"
            className="font-serif font-light text-black/90"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '0.05em' }}
          >
            {section.subtitle}
          </h1>
        </div>

        {/* Email */}
        <div className="contact-email text-center mb-12">
          <button
            onClick={copyEmail}
            className="group relative inline-block"
          >
            <span
              className="font-mono text-black/70 hover:text-black transition-colors duration-300"
              style={{ fontSize: 'clamp(16px, 2.5vw, 24px)', letterSpacing: '0.05em' }}
            >
              hello@almondgod.com
            </span>
            
            {/* Copy indicator */}
            <span
              className={`absolute -right-20 top-1/2 -translate-y-1/2 font-serif text-xs 
                         text-black/40 transition-opacity duration-300
                         ${copied ? 'opacity-100' : 'opacity-0'}`}
            >
              copied!
            </span>
            
            {/* Glow pulse */}
            <span
              className="absolute inset-0 -z-10 bg-black/5 rounded-full blur-xl 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500
                         animate-pulse"
              style={{ transform: 'scale(2)' }}
            />
          </button>
          
          <p className="font-serif text-black/30 text-xs mt-4 tracking-wider">
            Click to copy
          </p>
        </div>

        {/* Social links */}
        <div className="contact-social flex items-center justify-center gap-8 mb-16">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={`https://${link.description}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-serif text-sm text-black/40 hover:text-black 
                         transition-colors duration-300 relative"
            >
              {link.title}
              {/* Gradient underline */}
              <span
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r 
                           from-transparent via-black/40 to-transparent
                           transform scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300"
              />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-black/10 mx-auto mb-16" />

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="contact-form space-y-6">
          {/* Name */}
          <div>
            <label className="block font-serif text-xs text-black/40 tracking-[0.2em] uppercase mb-2">
              Name
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              required
              className="w-full border border-black/15 bg-transparent px-4 py-3 
                         font-serif text-black/80 placeholder:text-black/20
                         focus:border-black/40 focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-serif text-xs text-black/40 tracking-[0.2em] uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              required
              className="w-full border border-black/15 bg-transparent px-4 py-3 
                         font-serif text-black/80 placeholder:text-black/20
                         focus:border-black/40 focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-serif text-xs text-black/40 tracking-[0.2em] uppercase mb-2">
              Message
            </label>
            <textarea
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              required
              rows={5}
              className="w-full border border-black/15 bg-transparent px-4 py-3 
                         font-serif text-black/80 placeholder:text-black/20
                         focus:border-black/40 focus:outline-none transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>

          {/* Submit button */}
          <div className="text-center pt-4">
            <button
              ref={submitBtnRef}
              type="submit"
              disabled={isSubmitting}
              className="inline-block border border-black/30 hover:border-black 
                         hover:bg-black hover:text-white px-12 py-3
                         font-serif text-sm tracking-[0.2em] uppercase
                         transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitted ? 'Message Sent' : isSubmitting ? '' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
