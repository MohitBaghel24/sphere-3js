import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const SOCIAL_LINKS = [
  { name: 'GitHub', handle: 'MohitBaghel24', url: 'https://github.com/MohitBaghel24' },
  { name: 'Mohit Creations', handle: 'Mohit Creations', url: 'https://mohitbaghel.dev' },
  { name: 'X', handle: '@MohitBaghel24', url: 'https://x.com/MohitBaghel24' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mohitbaghel0202@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (e) {
      console.log('Copy failed');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center py-32 px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-xl"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] text-black/25 tracking-[0.4em] block mb-6">
            INITIATE CONTACT
          </span>
          <h1 
            className="font-serif text-4xl md:text-5xl text-black/80 mb-8"
            style={{ letterSpacing: '-0.02em' }}
          >
            Let's Create
          </h1>
          
          {/* Large monospace email with click-to-copy */}
          <motion.button
            onClick={handleCopyEmail}
            className="relative group"
            whileTap={{ scale: 0.98 }}
          >
            <span 
              className="font-mono text-xl md:text-2xl text-black/50 hover:text-black
                         transition-colors duration-300 tracking-wide"
            >
              mohitbaghel0202@gmail.com
            </span>
            
            {/* Glow pulse on copy */}
            <motion.div
              initial={false}
              animate={emailCopied ? { 
                opacity: [0, 1, 0],
                scale: [1, 1.5, 2],
              } : {}}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-full bg-black/5 pointer-events-none"
            />
            
            {/* Copy feedback */}
            <motion.span
              initial={false}
              animate={{ opacity: emailCopied ? 1 : 0, y: emailCopied ? 0 : 10 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                         font-mono text-[10px] text-black/40"
            >
              Copied!
            </motion.span>
          </motion.button>
        </div>
        
        {/* Form */}
        {!isSubmitted ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div>
              <label 
                htmlFor="name" 
                className="font-mono text-[10px] text-black/35 uppercase tracking-[0.2em] block mb-3"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border-b border-black/15 py-3 
                         font-serif text-lg text-black/80 placeholder:text-black/20
                         focus:outline-none focus:border-black/40 transition-colors"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label 
                htmlFor="email" 
                className="font-mono text-[10px] text-black/35 uppercase tracking-[0.2em] block mb-3"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border-b border-black/15 py-3 
                         font-serif text-lg text-black/80 placeholder:text-black/20
                         focus:outline-none focus:border-black/40 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label 
                htmlFor="message" 
                className="font-mono text-[10px] text-black/35 uppercase tracking-[0.2em] block mb-3"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent border-b border-black/15 py-3 
                         font-serif text-lg text-black/80 placeholder:text-black/20
                         focus:outline-none focus:border-black/40 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            
            {/* Submit button with animation */}
            <div className="pt-6 flex justify-center">
              <motion.button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className="relative font-mono text-xs uppercase tracking-[0.2em]
                         px-12 py-4 border border-black/80 text-black/80
                         hover:bg-black hover:text-white transition-all duration-500
                         disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            {/* Ring expansion animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 0.8, times: [0, 0.6, 1] }}
              className="w-16 h-16 border border-black/30 rounded-full mx-auto mb-8"
            />
            <p className="font-serif text-2xl text-black/70 mb-4">
              Message received.
            </p>
            <p className="font-serif text-lg text-black/35">
              I'll be in touch soon.
            </p>
          </motion.div>
        )}
        
        {/* Social links with animated underline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-20 pt-12 border-t border-black/10"
        >
          <div className="flex justify-center gap-12">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="group text-center"
              >
                <span className="font-mono text-[9px] text-black/25 uppercase tracking-[0.2em] block mb-2">
                  {link.name}
                </span>
                <span className="relative font-serif text-sm text-black/45 group-hover:text-black transition-colors">
                  {link.handle}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-black/50 
                                   group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
