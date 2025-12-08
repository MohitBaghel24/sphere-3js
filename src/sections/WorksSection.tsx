import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { sections } from '@/data/content';

interface Project {
  id: string;
  title: string;
  year: string;
  summary: string;
  techStack: string[];
  thumbnail: string;
}

function getProjects(): Project[] {
  const worksSection = sections[1];
  if (worksSection?.works) {
    return worksSection.works;
  }
  return [];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
      className="group cursor-pointer bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail - 3:4 ratio */}
      <div className="relative aspect-[3/4] bg-black/5 overflow-hidden">
        {/* Image with loading state */}
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/20 animate-pulse" />
        )}
        
        {/* Hover reveal - summary slides up */}
        <motion.div
          initial={false}
          animate={{ 
            y: isHovered ? 0 : 30, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        >
          <p className="font-serif text-xs text-white/90 leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </motion.div>
      </div>
      
      {/* Info */}
      <div className="p-4 space-y-2 bg-white/5 backdrop-blur-sm">
        <div className="flex items-baseline justify-between">
          <motion.h3 
            className="font-serif text-lg text-black/80"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ letterSpacing: '-0.01em' }}
          >
            {project.title}
          </motion.h3>
          <span className="font-mono text-xs text-black/40">{project.year}</span>
        </div>
        
        {/* Tech Stack */}
        <div className="pt-2">
          <p className="font-mono text-[9px] text-black/30 uppercase tracking-[0.1em] mb-1">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech, i) => (
              <span key={i} className="font-mono text-[8px] px-2 py-1 rounded bg-white/10 text-black/50">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="font-mono text-[8px] px-2 py-1 text-black/30">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorksSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects] = useState<Project[]>(getProjects());
  
  return (
    <div className="min-h-screen bg-transparent py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto px-8 mb-20"
      >
        <h1 
          className="font-serif text-4xl md:text-5xl text-black/80 mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          {sections[1]?.title || 'Selected Works'}
        </h1>
        <p className="font-serif text-lg text-black/35 max-w-2xl">
          {sections[1]?.description || 'A curated collection of digital experiences and creative projects.'}
        </p>
      </motion.div>
      
      {/* Grid - 2 columns desktop, 1 mobile */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <motion.div key={project.id} onClick={() => setSelectedProject(project)}>
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Fullscreen preview modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 bg-white/95 backdrop-blur-lg flex overflow-hidden"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            className="flex-1 flex items-center justify-center p-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-xs">
              <img 
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
          <motion.div 
            className="flex-1 flex items-center p-8"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-md">
              <h2 className="font-serif text-4xl text-black/80 mb-2">
                {selectedProject.title}
              </h2>
              <p className="font-mono text-xs text-black/40 uppercase tracking-widest mb-6">
                {selectedProject.year}
              </p>
              <p className="font-serif text-base text-black/60 mb-8 leading-relaxed">
                {selectedProject.summary}
              </p>
              
              {/* Tech Stack in Modal */}
              <div>
                <p className="font-mono text-xs text-black/40 uppercase tracking-widest mb-3">
                  Technology
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <span 
                      key={i}
                      className="font-mono text-xs px-3 py-1.5 rounded border border-black/10 text-black/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-8 font-mono text-xs uppercase tracking-widest text-black/40 hover:text-black/80 transition-colors"
              >
                Close ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
