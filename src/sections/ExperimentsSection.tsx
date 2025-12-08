import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Experiment {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'live' | 'development' | 'concept';
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'EXP-001',
    title: 'Tiny Worlds',
    description: 'Procedural miniature ecosystems generated in real-time.',
    tech: ['WebGL', 'GLSL', 'React'],
    status: 'live',
  },
  {
    id: 'EXP-002',
    title: 'Humanoid Pianist',
    description: 'Physics-based hand simulation playing generative compositions.',
    tech: ['Three.js', 'Cannon.js', 'Tone.js'],
    status: 'live',
  },
  {
    id: 'EXP-003',
    title: 'Particle Field',
    description: 'Interactive particle system responding to audio input.',
    tech: ['WebGL', 'Web Audio API'],
    status: 'live',
  },
  {
    id: 'EXP-004',
    title: 'Neural Terrain',
    description: 'AI-generated landscapes rendered in real-time.',
    tech: ['TensorFlow.js', 'WebGPU'],
    status: 'development',
  },
  {
    id: 'EXP-005',
    title: 'Cursor Constellations',
    description: 'Multi-user cursor visualization creating star patterns.',
    tech: ['WebSocket', 'Canvas'],
    status: 'live',
  },
  {
    id: 'EXP-006',
    title: 'Voice Morphology',
    description: 'Real-time voice manipulation and visualization.',
    tech: ['Web Speech', 'GLSL'],
    status: 'concept',
  },
];

const STATUS_COLORS = {
  live: 'bg-black text-white',
  development: 'bg-black/15 text-black/60',
  concept: 'border border-black/20 text-black/40 bg-transparent',
};

function ExperimentModal({ experiment, onClose }: { experiment: Experiment; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white/95 backdrop-blur-lg rounded-lg max-w-4xl w-full aspect-video
                   shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simulated WebGL canvas area */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center">
          <div className="text-center">
            <span className="font-mono text-6xl text-black/10 block mb-4">{experiment.id}</span>
            <p className="font-serif text-xl text-black/40">{experiment.title}</p>
            <p className="font-mono text-xs text-black/25 mt-4">WebGL Canvas Placeholder</p>
          </div>
        </div>
        
        {/* Close hint */}
        <div className="absolute bottom-4 right-4">
          <span className="font-mono text-[10px] text-black/30">ESC to close</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperimentsSection() {
  const [activeExperiment, setActiveExperiment] = useState<Experiment | null>(null);
  
  return (
    <div className="min-h-screen bg-transparent py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-5xl mx-auto px-8 mb-16"
      >
        <div className="flex items-baseline gap-4 mb-4">
          <h1 
            className="font-serif text-4xl md:text-5xl text-black/80"
            style={{ letterSpacing: '-0.02em' }}
          >
            Experiments
          </h1>
          <span className="font-mono text-xs text-black/25">
            LAB / {EXPERIMENTS.length}
          </span>
        </div>
        <p className="font-mono text-sm text-black/35 max-w-xl">
          Technical explorations, prototypes, and ongoing research 
          into emerging web technologies.
        </p>
      </motion.div>
      
      {/* Vertical Lab Feed */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-black/10">
          {EXPERIMENTS.map((experiment, i) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="group border-b border-black/10 py-8 cursor-pointer
                         hover:bg-white/50 transition-colors duration-300"
              onClick={() => experiment.status === 'live' && setActiveExperiment(experiment)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* ID */}
                <span className="font-mono text-xs text-black/25 w-20 shrink-0">
                  {experiment.id}
                </span>
                
                {/* Title & Description */}
                <div className="flex-1">
                  <h3 
                    className="font-serif text-xl text-black/70 group-hover:text-black 
                               transition-colors duration-300 mb-1"
                  >
                    {experiment.title}
                  </h3>
                  <p className="font-serif text-sm text-black/40">
                    {experiment.description}
                  </p>
                </div>
                
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 md:w-48 shrink-0">
                  {experiment.tech.map((t) => (
                    <span 
                      key={t}
                      className="font-mono text-[9px] text-black/35 bg-black/5 px-2 py-1 
                                 uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* Status + Launch */}
                <div className="flex items-center gap-4 shrink-0">
                  <span 
                    className={`font-mono text-[9px] px-3 py-1 uppercase tracking-widest 
                               ${STATUS_COLORS[experiment.status]}`}
                  >
                    {experiment.status}
                  </span>
                  
                  {experiment.status === 'live' && (
                    <button 
                      className="font-mono text-xs text-black/40 hover:text-black 
                                 uppercase tracking-widest transition-all duration-300
                                 group-hover:translate-x-1"
                    >
                      Launch →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Experiment Modal */}
      <AnimatePresence>
        {activeExperiment && (
          <ExperimentModal 
            experiment={activeExperiment} 
            onClose={() => setActiveExperiment(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
