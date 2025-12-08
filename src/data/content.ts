// Content data for each ring section - Step-based unlock system
export interface WorkItem {
  id: string;
  title: string;
  year: string;
  summary: string;
  techStack: string[];
  thumbnail: string;
  media?: string;
}

export interface PhilosophyStatement {
  number: string;
  title: string;
  body: string;
}

export interface ExperimentItem {
  id: string;
  title: string;
  description: string;
  type: 'webgl' | 'shader' | 'physics';
}

export interface SectionContent {
  id: string;
  ringIndex: number;
  title: string;
  subtitle: string;
  description: string;
  heroTitle?: string;
  heroSubtitle?: string;
  items?: { title: string; description: string }[];
  works?: WorkItem[];
  philosophyStatements?: PhilosophyStatement[];
  experiments?: ExperimentItem[];
  quote?: string;
  quoteAuthor?: string;
}

// Ring Labels in order
export const ringLabels = [
  'About',
  'Works',
  'Philosophy',
  'Experiments',
  'Contact',
];

// Section content mapped by ring index
export const sections: Record<number, SectionContent> = {
  0: {
    id: 'aboutSection',
    ringIndex: 0,
    title: 'About',
    subtitle: 'The Observer',
    heroTitle: 'The Observer Behind the Eye',
    heroSubtitle: 'A study in perception, creation, and systems.',
    description: `I am a student of both code and art, on a mission to bring digital visions to life. My world is a vibrant fusion of logic and creativity: I thrive on the challenge of full-stack development, building unique projects from the ground up, and find inspiration in the art of storytelling through photography and filmmaking. This blend of skills allows me to craft digital experiences that are not just functional, but also beautiful and memorable. Every project is a chance for me to learn and grow, pushing the boundaries of what's possible with technology and creativity.

At Mohit Creations, I bring ideas to life through a range of services: branding, web development, agency solutions, content creation, SaaS, and motion & 3D modeling. As a web designer, you merge artistry and technology to craft "digital experiences" that inform, captivate, and inspire. Every day brings something new — one moment you're sketching innovative concepts, the next you're turning them into seamless, responsive designs. Web design keeps you pushing boundaries and creating at every turn!`,
    items: [
      { title: '45+', description: 'Presence in global markets - Expanding reach across international regions with localized expertise and worldwide impact.' },
      { title: '15M', description: 'In strategic investments - Driving growth with curated partnerships and high-performing, audience-driven initiatives.' },
      { title: '158+', description: 'Trusted brand collaborations - Shaping industry conversations through innovation, creativity, and lasting influence.' },
    ],
  },
  1: {
    id: 'worksSection',
    ringIndex: 1,
    title: 'Works',
    subtitle: 'Selected Projects',
    description: 'A curated archive of digital experiences, each crafted to expand the boundaries of perception and connect technology with human emotion.',
    works: [
      {
        id: 'nebula-dreams',
        title: 'Nebula Dreams',
        year: '2025',
        summary: 'An immersive journey through procedurally generated cosmic landscapes, where sound shapes reality and movement creates meaning. A full-stack exploration of generative aesthetics and interactive storytelling.',
        techStack: ['Three.js', 'WebGL', 'Web Audio API', 'GLSL'],
        thumbnail: 'https://picsum.photos/400/600?random=1',
      },
      {
        id: 'echo-chamber',
        title: 'Echo Chamber',
        year: '2024',
        summary: 'Audio-reactive installation exploring the resonance between human voice and digital response. Developed from initial concept through deployment, featuring real-time audio analysis and adaptive visual responses.',
        techStack: ['React', 'Tone.js', 'Canvas API', 'Machine Learning'],
        thumbnail: 'https://picsum.photos/400/600?random=2',
      },
      {
        id: 'data-sculpture',
        title: 'Data Sculpture',
        year: '2024',
        summary: 'Transforming live financial data streams into organic, breathing architectural forms. Built end-to-end with backend infrastructure for real-time data ingestion and WebSocket streaming.',
        techStack: ['D3.js', 'Three.js', 'WebSocket', 'Node.js'],
        thumbnail: 'https://picsum.photos/400/600?random=3',
      },
      {
        id: 'perception-engine',
        title: 'Perception Engine',
        year: '2023',
        summary: 'Real-time eye-tracking experience that adapts its visual complexity based on viewer attention. A study in human-computer interaction and adaptive interface design.',
        techStack: ['TensorFlow.js', 'WebGL', 'Computer Vision'],
        thumbnail: 'https://picsum.photos/400/600?random=4',
      },
      {
        id: 'neural-garden',
        title: 'Neural Garden',
        year: '2023',
        summary: 'Generative ecosystem where artificial life forms evolve based on collective user interaction. Showcasing emergent behavior and the beauty of systems that learn and adapt.',
        techStack: ['Neural Networks', 'Genetic Algorithms', 'Canvas'],
        thumbnail: 'https://picsum.photos/400/600?random=5',
      },
      {
        id: 'temporal-drift',
        title: 'Temporal Drift',
        year: '2022',
        summary: 'Time-based installation capturing and visualizing the passage of moments in an ever-shifting landscape. A meditation on impermanence and the beauty of transient digital experiences.',
        techStack: ['GLSL Shaders', 'Three.js', 'FFmpeg'],
        thumbnail: 'https://picsum.photos/400/600?random=6',
      },
    ],
  },
  2: {
    id: 'philosophySection',
    ringIndex: 2,
    title: 'Philosophy',
    subtitle: 'Principles of Construction',
    description: 'The foundational beliefs that guide every creative decision.',
    philosophyStatements: [
      {
        number: '01',
        title: 'Constraint Breeds Creativity',
        body: 'Limitations are not obstacles but invitations. Within boundaries, innovation flourishes. The canvas edge teaches the brush where to dance.',
      },
      {
        number: '02',
        title: 'Every Pixel is Intentional',
        body: 'There is no accident in craft. Each element exists because it must. Noise is merely signal we have not yet understood.',
      },
      {
        number: '03',
        title: 'Technology Serves Emotion',
        body: 'Code is poetry written for machines that speaks to hearts. The most sophisticated algorithm means nothing if it cannot move the soul.',
      },
      {
        number: '04',
        title: 'Simplicity is the Ultimate Sophistication',
        body: 'To reduce is to reveal. Strip away the unnecessary until only essence remains. True complexity hides within apparent simplicity.',
      },
      {
        number: '05',
        title: 'The User is a Collaborator',
        body: 'Every interaction completes the work. The observer is never passive. Meaning emerges from the space between creator and witness.',
      },
      {
        number: '06',
        title: 'Embrace the Impermanent',
        body: 'Digital work exists in flux. Code decays, platforms evolve, browsers forget. Create not for permanence but for the present moment.',
      },
      {
        number: '07',
        title: 'Beauty Requires Courage',
        body: 'To pursue aesthetic excellence is to risk failure visibly. The commitment to craft demands vulnerability. Create boldly.',
      },
    ],
    quote: 'We do not see things as they are, we see them as we are.',
    quoteAuthor: 'Anaïs Nin',
  },
  3: {
    id: 'experimentsSection',
    ringIndex: 3,
    title: 'Experiments',
    subtitle: 'The Laboratory',
    description: 'Ongoing explorations in code, physics, and perception. Works in progress. Failures welcomed.',
    experiments: [
      {
        id: 'fluid-dynamics',
        title: 'Fluid Dynamics',
        description: 'Real-time Navier-Stokes simulation with interactive perturbation.',
        type: 'physics',
      },
      {
        id: 'ray-marcher',
        title: 'Ray Marcher',
        description: 'Distance field rendering of impossible geometric forms.',
        type: 'shader',
      },
      {
        id: 'particle-life',
        title: 'Particle Life',
        description: 'Emergent behavior from simple attraction/repulsion rules.',
        type: 'physics',
      },
      {
        id: 'noise-fields',
        title: 'Noise Fields',
        description: 'Flowing vector fields driven by layered simplex noise.',
        type: 'webgl',
      },
      {
        id: 'reaction-diffusion',
        title: 'Reaction Diffusion',
        description: 'Gray-Scott model producing organic pattern formation.',
        type: 'shader',
      },
      {
        id: 'cloth-simulation',
        title: 'Cloth Simulation',
        description: 'Verlet integration for realistic fabric behavior.',
        type: 'physics',
      },
    ],
  },
  4: {
    id: 'contactSection',
    ringIndex: 4,
    title: 'Contact',
    subtitle: 'Initiate Contact',
    description: 'For collaborations, commissions, or conversations.',
    items: [
      { title: 'Twitter', description: '@almondgod' },
      { title: 'GitHub', description: 'github.com/almondgod' },
      { title: 'LinkedIn', description: 'linkedin.com/in/almondgod' },
    ],
  },
};
