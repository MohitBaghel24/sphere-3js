import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

// Import local book thumbnails
import allTroubles from '@/thum/allthetroublesoftheworld.webp';
import battlestar from '@/thum/battlestargalactica.webp';
import beginningOfInfinity from '@/thum/beginningofinfinity.webp';
import benjaminFranklin from '@/thum/benjaminfranklin.webp';
import berserk from '@/thum/berserk.webp';
import bloodOfOlympus from '@/thum/bloodofolympus.webp';
import bone from '@/thum/bone.webp';
import captainBluebear from '@/thum/captainbluebear.webp';
import childhoodsEnd from '@/thum/childhoodsend.webp';
import crystalNights from '@/thum/crystalnights.webp';
import deathsEnd from '@/thum/deathsend.webp';
import dune from '@/thum/dune.webp';
import eldest from '@/thum/eldest.webp';
import elonMusk from '@/thum/elonmusk.webp';
import enchiridion from '@/thum/enchiridion.webp';
import eragon from '@/thum/eragon.webp';
import feelingIsTheSecret from '@/thum/feelingisthesecret.webp';
import foundation from '@/thum/foundation.webp';
import gallicWars from '@/thum/gallicwars.webp';
import goddessesInEverywoman from '@/thum/goddessesineverywoman.webp';
import grendel from '@/thum/grendel.webp';
import hillbillyElegy from '@/thum/hillbillyelegy.webp';
import hitchhikersGuide from '@/thum/hitchhikersguidetothegalaxy.webp';
import incerto from '@/thum/incerto.webp';
import iRobot from '@/thum/irobot.webp';
import julyAndEverything from '@/thum/julyandeverythingafter.webp';
import kingWarrior from '@/thum/kingwarriormagicianlover.webp';
import kybalion from '@/thum/kybalion.webp';
import lessonsOfHistory from '@/thum/lessonsofhistory.webp';
import mandukyaUpanishad from '@/thum/mandukyaupanishad.webp';
import mansSearchForMeaning from '@/thum/manssearchformeaning.webp';
import memoriesDreams from '@/thum/memoriesdreamsreflections.webp';
import mossflower from '@/thum/mossflower.webp';
import navalmanack from '@/thum/navalmanack.webp';
import onceAndFutureKing from '@/thum/onceandfutureking.webp';
import onIntelligence from '@/thum/onintelligence.webp';
import permutationCity from '@/thum/permutationcity.webp';
import powerOfAwareness from '@/thum/powerofawareness.webp';
import redBook from '@/thum/redbook.webp';
import redwall from '@/thum/redwall.webp';
import rockefeller from '@/thum/rockefeller.webp';
import rumo from '@/thum/rumo.webp';
import scalingEra from '@/thum/scalingera.webp';
import shoeDog from '@/thum/shoedog.webp';
import startupOfYou from '@/thum/startupofyou.webp';
import steveJobs from '@/thum/stevejobs.webp';
import tantraIlluminated from '@/thum/tantrailluminated.webp';
import theLastQuestion from '@/thum/thelastquestion.webp';
import theTrial from '@/thum/thetrial.webp';
import threeBodyProblem from '@/thum/threebodyproblem.webp';
import tuckEverlasting from '@/thum/tuckeverlasting.webp';
import vagabond from '@/thum/vagabond.webp';
import vitalQuestion from '@/thum/vitalquestion.webp';
import warOfArt from '@/thum/warofart.webp';
import whatHasGovernment from '@/thum/whathasthegovernmentdonetoourmoney.webp';
import whenBreathBecomesAir from '@/thum/whenbreathbecomesair.webp';
import whyGreatnessCannotBePlanned from '@/thum/whygreatnesscannotbeplanned.webp';
import windInTheWillows from '@/thum/windinthewillows.webp';
import zeroToOne from '@/thum/zerotoone.webp';

// Books data with local thumbnails
const booksData = [
  {
    id: 1,
    title: "All the Troubles of the World",
    author: "Isaac Asimov",
    genre: "Science Fiction",
    cover: allTroubles,
    summary: "A thought-provoking exploration of AI and humanity's relationship with technology.",
    coreIdea: "Technology reflects our own nature; true wisdom comes from within.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 2,
    title: "Battlestar Galactica",
    author: "Glen A. Larson",
    genre: "Science Fiction",
    cover: battlestar,
    summary: "Epic space opera exploring survival, identity, and what it means to be human.",
    coreIdea: "The cycle of conflict between creators and creations; humanity's search for home.",
    realityRating: 8,
    category: "manga"
  },
  {
    id: 3,
    title: "The Beginning of Infinity",
    author: "David Deutsch",
    genre: "Philosophy of Science",
    cover: beginningOfInfinity,
    summary: "Exploration of human knowledge, progress, and the infinite potential of understanding.",
    coreIdea: "All problems are solvable with the right knowledge; progress has no limits.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 4,
    title: "Benjamin Franklin",
    author: "Walter Isaacson",
    genre: "Biography",
    cover: benjaminFranklin,
    summary: "The life of America's most versatile founding father and polymath.",
    coreIdea: "Curiosity and practical wisdom can change the world.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 5,
    title: "Berserk",
    author: "Kentaro Miura",
    genre: "Dark Fantasy Manga",
    cover: berserk,
    summary: "Dark fantasy epic exploring fate, free will, and the human struggle against destiny.",
    coreIdea: "True strength is forged through suffering; we define our own fate.",
    realityRating: 10,
    category: "manga"
  },
  {
    id: 6,
    title: "The Blood of Olympus",
    author: "Rick Riordan",
    genre: "Fantasy",
    cover: bloodOfOlympus,
    summary: "Mythological adventure exploring heroism and the power of unity.",
    coreIdea: "True heroism comes from sacrifice and working together.",
    realityRating: 8,
    category: "manga"
  },
  {
    id: 7,
    title: "Bone",
    author: "Jeff Smith",
    genre: "Fantasy Comic",
    cover: bone,
    summary: "Epic fantasy adventure with humor and heart.",
    coreIdea: "Courage and friendship can overcome the darkest evil.",
    realityRating: 8,
    category: "manga"
  },
  {
    id: 8,
    title: "The 13½ Lives of Captain Bluebear",
    author: "Walter Moers",
    genre: "Fantasy",
    cover: captainBluebear,
    summary: "Whimsical adventure through a world of imagination and wonder.",
    coreIdea: "Life is an endless adventure of learning and transformation.",
    realityRating: 8,
    category: "philosophy"
  },
  {
    id: 9,
    title: "Childhood's End",
    author: "Arthur C. Clarke",
    genre: "Science Fiction",
    cover: childhoodsEnd,
    summary: "Humanity's transcendence under the guidance of mysterious alien Overlords.",
    coreIdea: "Evolution may lead us beyond our current form of consciousness.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 10,
    title: "Crystal Nights",
    author: "Greg Egan",
    genre: "Science Fiction",
    cover: crystalNights,
    summary: "Exploration of simulated consciousness and the ethics of creating intelligent life.",
    coreIdea: "What responsibilities do creators have to their creations?",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 11,
    title: "Death's End",
    author: "Liu Cixin",
    genre: "Science Fiction",
    cover: deathsEnd,
    summary: "Epic conclusion to the Three-Body Problem trilogy, spanning eons.",
    coreIdea: "The universe is a dark forest; survival requires difficult choices.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 12,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    cover: dune,
    summary: "Epic tale of politics, religion, and ecology on a desert planet.",
    coreIdea: "He who controls the spice controls the universe; prescience is a trap.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 13,
    title: "Eldest",
    author: "Christopher Paolini",
    genre: "Fantasy",
    cover: eldest,
    summary: "Continuation of the Inheritance Cycle, exploring magic and destiny.",
    coreIdea: "True power comes from knowledge and self-mastery.",
    realityRating: 8,
    category: "manga"
  },
  {
    id: 14,
    title: "Elon Musk",
    author: "Ashlee Vance",
    genre: "Biography",
    cover: elonMusk,
    summary: "The story of one of the most ambitious entrepreneurs of our time.",
    coreIdea: "Ambitious goals and relentless execution can change humanity's future.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 15,
    title: "Enchiridion",
    author: "Epictetus",
    genre: "Stoicism",
    cover: enchiridion,
    summary: "Practical manual for living a virtuous life through Stoic principles.",
    coreIdea: "Focus only on what you can control; accept what you cannot.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 16,
    title: "Eragon",
    author: "Christopher Paolini",
    genre: "Fantasy",
    cover: eragon,
    summary: "A farm boy discovers his destiny as the last Dragon Rider.",
    coreIdea: "Great power brings great responsibility; choose your path wisely.",
    realityRating: 8,
    category: "manga"
  },
  {
    id: 17,
    title: "Feeling is the Secret",
    author: "Neville Goddard",
    genre: "Metaphysics",
    cover: feelingIsTheSecret,
    summary: "The power of imagination and feeling in creating reality.",
    coreIdea: "Your subconscious mind creates your reality through feeling.",
    realityRating: 9,
    category: "psychology"
  },
  {
    id: 18,
    title: "Foundation",
    author: "Isaac Asimov",
    genre: "Science Fiction",
    cover: foundation,
    summary: "The fall of a galactic empire and the preservation of knowledge.",
    coreIdea: "History follows patterns; knowledge is civilization's greatest treasure.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 19,
    title: "The Gallic Wars",
    author: "Julius Caesar",
    genre: "History",
    cover: gallicWars,
    summary: "Caesar's own account of his military campaigns in Gaul.",
    coreIdea: "Strategy, leadership, and determination shape history.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 20,
    title: "Goddesses in Everywoman",
    author: "Jean Shinoda Bolen",
    genre: "Psychology",
    cover: goddessesInEverywoman,
    summary: "Jungian archetypes of the feminine psyche through Greek goddesses.",
    coreIdea: "Understanding your inner archetypes leads to self-knowledge.",
    realityRating: 8,
    category: "psychology"
  },
  {
    id: 21,
    title: "Grendel",
    author: "John Gardner",
    genre: "Literary Fiction",
    cover: grendel,
    summary: "Beowulf retold from the monster's perspective.",
    coreIdea: "Meaning is what we create in an indifferent universe.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 22,
    title: "Hillbilly Elegy",
    author: "J.D. Vance",
    genre: "Memoir",
    cover: hillbillyElegy,
    summary: "A personal account of growing up in Appalachian America.",
    coreIdea: "Culture and family shape our destiny, but we can transcend them.",
    realityRating: 8,
    category: "philosophy"
  },
  {
    id: 23,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Science Fiction Comedy",
    cover: hitchhikersGuide,
    summary: "Absurdist cosmic adventure seeking the meaning of life.",
    coreIdea: "Don't panic; the universe is stranger and funnier than we imagine.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 24,
    title: "Incerto (Antifragile)",
    author: "Nassim Nicholas Taleb",
    genre: "Philosophy",
    cover: incerto,
    summary: "How to thrive in a world of uncertainty and randomness.",
    coreIdea: "Antifragility: some things benefit from shocks and volatility.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 25,
    title: "I, Robot",
    author: "Isaac Asimov",
    genre: "Science Fiction",
    cover: iRobot,
    summary: "Stories exploring the relationship between humans and robots.",
    coreIdea: "The Three Laws of Robotics and their unexpected consequences.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 26,
    title: "July and Everything After",
    author: "Various",
    genre: "Literary Fiction",
    cover: julyAndEverything,
    summary: "A journey through time and memory.",
    coreIdea: "Every moment contains the seeds of transformation.",
    realityRating: 8,
    category: "philosophy"
  },
  {
    id: 27,
    title: "King, Warrior, Magician, Lover",
    author: "Robert Moore",
    genre: "Psychology",
    cover: kingWarrior,
    summary: "Jungian archetypes of mature masculinity.",
    coreIdea: "Access the four archetypes to become a fully realized man.",
    realityRating: 9,
    category: "psychology"
  },
  {
    id: 28,
    title: "The Kybalion",
    author: "Three Initiates",
    genre: "Hermetic Philosophy",
    cover: kybalion,
    summary: "Seven principles of Hermetic philosophy from ancient Egypt.",
    coreIdea: "As above, so below; the universe operates by mental laws.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 29,
    title: "Lessons of History",
    author: "Will & Ariel Durant",
    genre: "History/Philosophy",
    cover: lessonsOfHistory,
    summary: "Distilled wisdom from the Durants' lifetime study of civilization.",
    coreIdea: "History reveals patterns; human nature remains constant.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 30,
    title: "Mandukya Upanishad",
    author: "Ancient Sages",
    genre: "Hindu Philosophy",
    cover: mandukyaUpanishad,
    summary: "The nature of consciousness through the analysis of OM.",
    coreIdea: "Reality has four states; pure consciousness underlies all.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 31,
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    genre: "Psychology",
    cover: mansSearchForMeaning,
    summary: "Finding purpose through suffering in Nazi concentration camps.",
    coreIdea: "Those who have a why can bear almost any how.",
    realityRating: 10,
    category: "psychology"
  },
  {
    id: 32,
    title: "Memories, Dreams, Reflections",
    author: "Carl Jung",
    genre: "Psychology/Autobiography",
    cover: memoriesDreams,
    summary: "Jung's personal journey into the depths of the psyche.",
    coreIdea: "The unconscious holds the keys to self-knowledge.",
    realityRating: 10,
    category: "psychology"
  },
  {
    id: 33,
    title: "Mossflower",
    author: "Brian Jacques",
    genre: "Fantasy",
    cover: mossflower,
    summary: "Epic tale of woodland creatures fighting for freedom.",
    coreIdea: "Courage and friendship can overthrow tyranny.",
    realityRating: 8,
    category: "manga"
  },
  {
    id: 34,
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    genre: "Philosophy/Business",
    cover: navalmanack,
    summary: "Wisdom on wealth and happiness from Naval Ravikant.",
    coreIdea: "Seek wealth through leverage and specific knowledge; happiness is a skill.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 35,
    title: "The Once and Future King",
    author: "T.H. White",
    genre: "Fantasy",
    cover: onceAndFutureKing,
    summary: "The legendary story of King Arthur and his knights.",
    coreIdea: "Might must be used for right; power corrupts.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 36,
    title: "On Intelligence",
    author: "Jeff Hawkins",
    genre: "Neuroscience",
    cover: onIntelligence,
    summary: "A new framework for understanding how the brain works.",
    coreIdea: "Intelligence is prediction based on hierarchical memory.",
    realityRating: 9,
    category: "psychology"
  },
  {
    id: 37,
    title: "Permutation City",
    author: "Greg Egan",
    genre: "Science Fiction",
    cover: permutationCity,
    summary: "Exploration of consciousness in simulated realities.",
    coreIdea: "What is real if consciousness can exist in any substrate?",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 38,
    title: "The Power of Awareness",
    author: "Neville Goddard",
    genre: "Metaphysics",
    cover: powerOfAwareness,
    summary: "Consciousness as the creator of reality.",
    coreIdea: "Assume the feeling of your wish fulfilled.",
    realityRating: 9,
    category: "psychology"
  },
  {
    id: 39,
    title: "The Red Book",
    author: "Carl Jung",
    genre: "Psychology",
    cover: redBook,
    summary: "Jung's personal confrontation with the unconscious.",
    coreIdea: "The journey inward reveals the depths of the psyche.",
    realityRating: 10,
    category: "psychology"
  },
  {
    id: 40,
    title: "Redwall",
    author: "Brian Jacques",
    genre: "Fantasy",
    cover: redwall,
    summary: "Epic tale of mice defending their abbey from invasion.",
    coreIdea: "Honor, courage, and community can overcome any evil.",
    realityRating: 8,
    category: "manga"
  },
  {
    id: 41,
    title: "Rockefeller's 38 Letters",
    author: "John D. Rockefeller",
    genre: "Business/Biography",
    cover: rockefeller,
    summary: "Letters of wisdom from one of history's richest men.",
    coreIdea: "Discipline, vision, and patience build empires.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 42,
    title: "Rumo",
    author: "Walter Moers",
    genre: "Fantasy",
    cover: rumo,
    summary: "A young Wolperting's epic adventure in Zamonia.",
    coreIdea: "True courage is following your heart despite fear.",
    realityRating: 8,
    category: "manga"
  },
  {
    id: 43,
    title: "Scaling Era",
    author: "Various",
    genre: "Technology",
    cover: scalingEra,
    summary: "The age of exponential technological growth.",
    coreIdea: "Technology scales; understanding this changes everything.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 44,
    title: "Shoe Dog",
    author: "Phil Knight",
    genre: "Memoir/Business",
    cover: shoeDog,
    summary: "The creation of Nike by its founder.",
    coreIdea: "Passion and persistence can build empires.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 45,
    title: "The Startup of You",
    author: "Reid Hoffman",
    genre: "Business",
    cover: startupOfYou,
    summary: "Treating your career like a startup.",
    coreIdea: "Invest in yourself; adapt and evolve constantly.",
    realityRating: 8,
    category: "philosophy"
  },
  {
    id: 46,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "Biography",
    cover: steveJobs,
    summary: "The life of Apple's visionary founder.",
    coreIdea: "Reality distortion and taste can change the world.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 47,
    title: "Tantra Illuminated",
    author: "Christopher Wallis",
    genre: "Eastern Philosophy",
    cover: tantraIlluminated,
    summary: "Comprehensive guide to the philosophy of Tantra.",
    coreIdea: "Reality is the play of divine consciousness.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 48,
    title: "The Last Question",
    author: "Isaac Asimov",
    genre: "Science Fiction",
    cover: theLastQuestion,
    summary: "Humanity's quest to reverse entropy across eons.",
    coreIdea: "The ultimate fate of the universe and consciousness.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 49,
    title: "The Trial",
    author: "Franz Kafka",
    genre: "Literary Fiction",
    cover: theTrial,
    summary: "A man arrested for an unknown crime in an absurd world.",
    coreIdea: "Bureaucracy and guilt in an incomprehensible system.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 50,
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    genre: "Science Fiction",
    cover: threeBodyProblem,
    summary: "First contact during China's Cultural Revolution.",
    coreIdea: "The universe may be more hostile than we imagine.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 51,
    title: "Tuck Everlasting",
    author: "Natalie Babbitt",
    genre: "Fantasy",
    cover: tuckEverlasting,
    summary: "A family cursed with immortality and a girl who discovers their secret.",
    coreIdea: "Life's meaning comes from its finite nature.",
    realityRating: 8,
    category: "philosophy"
  },
  {
    id: 52,
    title: "Vagabond",
    author: "Takehiko Inoue",
    genre: "Historical Manga",
    cover: vagabond,
    summary: "The life of legendary swordsman Miyamoto Musashi.",
    coreIdea: "The way of the sword is the way of self-mastery.",
    realityRating: 10,
    category: "manga"
  },
  {
    id: 53,
    title: "The Vital Question",
    author: "Nick Lane",
    genre: "Science",
    cover: vitalQuestion,
    summary: "The deep origins of life and energy.",
    coreIdea: "Life's complexity arose from energy constraints.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 54,
    title: "The War of Art",
    author: "Steven Pressfield",
    genre: "Self-Help",
    cover: warOfArt,
    summary: "Overcoming creative resistance.",
    coreIdea: "Resistance is the enemy; turning pro defeats it.",
    realityRating: 9,
    category: "psychology"
  },
  {
    id: 55,
    title: "What Has Government Done to Our Money?",
    author: "Murray Rothbard",
    genre: "Economics",
    cover: whatHasGovernment,
    summary: "Critique of government monetary policy.",
    coreIdea: "Sound money requires freedom from government control.",
    realityRating: 8,
    category: "philosophy"
  },
  {
    id: 56,
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    genre: "Memoir",
    cover: whenBreathBecomesAir,
    summary: "A neurosurgeon's confrontation with mortality.",
    coreIdea: "Meaning is found in the face of death.",
    realityRating: 10,
    category: "philosophy"
  },
  {
    id: 57,
    title: "Why Greatness Cannot Be Planned",
    author: "Kenneth Stanley",
    genre: "Science/Philosophy",
    cover: whyGreatnessCannotBePlanned,
    summary: "The myth of the objective and the power of novelty search.",
    coreIdea: "True innovation comes from exploring, not planning.",
    realityRating: 9,
    category: "philosophy"
  },
  {
    id: 58,
    title: "The Wind in the Willows",
    author: "Kenneth Grahame",
    genre: "Classic Fiction",
    cover: windInTheWillows,
    summary: "Adventures of Mole, Rat, Toad, and Badger along the river.",
    coreIdea: "Friendship, home, and simple pleasures are life's treasures.",
    realityRating: 8,
    category: "philosophy"
  },
  {
    id: 59,
    title: "Zero to One",
    author: "Peter Thiel",
    genre: "Business",
    cover: zeroToOne,
    summary: "Creating something new rather than copying what exists.",
    coreIdea: "True progress is going from zero to one, not one to many.",
    realityRating: 9,
    category: "philosophy"
  }
];

// 3D Almond Eye Scene Class
class AlmondEyeScene {
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  eyeMesh: THREE.Group | null = null;
  particles: THREE.Points | null = null;
  meshNetwork: THREE.LineSegments | null = null;
  time = 0;
  isZoomed = false;
  animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.init(canvas);
  }

  init(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8f7f4);

    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    const softLight = new THREE.PointLight(0xd4af37, 0.3);
    softLight.position.set(-3, 3, 3);
    this.scene.add(softLight);

    this.createAlmondEye();
    this.createParticles();
    this.createMeshNetwork();
    this.setupMouseParallax();
    this.animate();
  }

  createAlmondEye() {
    const group = new THREE.Group();

    const shells = [
      { radius: 0.8, segments: 32, opacity: 0.15 },
      { radius: 0.95, segments: 32, opacity: 0.1 },
      { radius: 1.1, segments: 32, opacity: 0.08 },
      { radius: 1.25, segments: 32, opacity: 0.06 }
    ];

    shells.forEach((shellConfig, index) => {
      const geometry = new THREE.IcosahedronGeometry(shellConfig.radius, shellConfig.segments);
      geometry.scale(1, 1.3, 1);

      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const z = positions[i + 2];
        const taper = Math.cos(z * Math.PI / 2);
        positions[i] *= taper;
        positions[i + 2] *= taper;
      }
      geometry.attributes.position.needsUpdate = true;

      const material = new THREE.LineBasicMaterial({
        color: 0x1a1a1a,
        opacity: shellConfig.opacity,
        transparent: true,
        linewidth: 1
      });

      const wireframe = new THREE.WireframeGeometry(geometry);
      const line = new THREE.LineSegments(wireframe, material);

      line.rotation.y = index * Math.PI / 4;
      line.rotation.x = index * 0.15;

      group.add(line);
    });

    const pupilGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const pupilMaterial = new THREE.MeshPhongMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 0.8
    });
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.scale.z = 0.6;
    group.add(pupil);

    const glowGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    group.add(glow);

    this.eyeMesh = group;
    this.scene!.add(group);
  }

  createParticles() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.02,
      transparent: true,
      opacity: 0.4
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene!.add(this.particles);
  }

  createMeshNetwork() {
    const segments = 15;
    const grid = [];

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        grid.push(new THREE.Vector3(
          (i - segments / 2) * 0.4,
          (j - segments / 2) * 0.4,
          (Math.sin(i * 0.5) + Math.cos(j * 0.5)) * 0.3
        ));
      }
    }

    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const current = grid[i * segments + j];

        if (j < segments - 1) {
          const next = grid[i * segments + j + 1];
          positions.push(current.x, current.y, current.z);
          positions.push(next.x, next.y, next.z);
        }

        if (i < segments - 1) {
          const next = grid[(i + 1) * segments + j];
          positions.push(current.x, current.y, current.z);
          positions.push(next.x, next.y, next.z);
        }
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

    const material = new THREE.LineBasicMaterial({
      color: 0x1a1a1a,
      opacity: 0.1,
      transparent: true,
      linewidth: 0.5
    });

    this.meshNetwork = new THREE.LineSegments(geometry, material);
    this.meshNetwork.position.z = -3;
    this.scene!.add(this.meshNetwork);
  }

  setupMouseParallax() {
    document.addEventListener('mousemove', (e) => {
      if (this.isZoomed || !this.eyeMesh) return;

      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      gsap.to(this.eyeMesh.rotation, {
        x: y * 0.3,
        y: x * 0.3,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }

  animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.time += 0.0008;

    if (this.eyeMesh) {
      const breathe = Math.sin(this.time * Math.PI * 0.8) * 0.05 + 1;
      this.eyeMesh.scale.set(breathe, breathe, breathe);

      if (!this.isZoomed) {
        this.eyeMesh.rotation.z += 0.0002;
      }
    }

    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(this.time * 0.5 + i) * 0.0002;
        positions[i + 1] += Math.cos(this.time * 0.5 + i) * 0.0002;
        positions[i + 2] += Math.sin(this.time * 0.3 + i * 2) * 0.0001;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer!.render(this.scene!, this.camera!);
  }

  zoomInToPupil(callback: () => void) {
    this.isZoomed = true;

    gsap.timeline()
      .to(this.camera!.position, {
        z: 0.5,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      .to(this.eyeMesh!.rotation, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      .to(this.eyeMesh!.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      .to(this.particles!.material, {
        opacity: 0,
        duration: 1,
      }, 0.2)
      .to(this.meshNetwork!.material, {
        opacity: 0,
        duration: 1,
      }, 0.2)
      .call(callback, [], 1.5);
  }

  zoomOutFromPupil() {
    this.isZoomed = false;

    gsap.timeline()
      .to(this.camera!.position, {
        z: 3,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      .to(this.eyeMesh!.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      .to(this.particles!.material, {
        opacity: 0.4,
        duration: 1,
      }, 0.2)
      .to(this.meshNetwork!.material, {
        opacity: 0.1,
        duration: 1,
      }, 0.2);
  }

  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

export default function PhilosophySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<AlmondEyeScene | null>(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedBook, setSelectedBook] = useState<typeof booksData[0] | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    sceneRef.current = new AlmondEyeScene(canvasRef.current);

    const handleResize = () => {
      if (!canvasRef.current || !sceneRef.current?.renderer) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      sceneRef.current.camera!.aspect = width / height;
      sceneRef.current.camera!.updateProjectionMatrix();
      sceneRef.current.renderer!.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sceneRef.current?.dispose();
    };
  }, []);

  const filteredBooks = currentFilter === 'all'
    ? booksData
    : booksData.filter(book => book.category === currentFilter);

  const openBookDetail = (book: typeof booksData[0]) => {
    setSelectedBook(book);
    sceneRef.current?.zoomInToPupil(() => {
      // Zoom animation complete
    });
  };

  const closeBookDetail = () => {
    setSelectedBook(null);
    sceneRef.current?.zoomOutFromPupil();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Layout - Stack on mobile, side by side on desktop */}
      <div className="flex flex-col md:flex-row h-screen gap-0 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
        {/* Left: 3D Scene - Hidden on mobile or smaller */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-slate-50 to-slate-100 items-center justify-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-20 bg-gradient-radial from-transparent to-slate-200" />
          </div>
          
          <canvas
            ref={canvasRef}
            className="w-full h-full relative z-10"
          />
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-gradient-radial from-transparent to-black z-20" />
        </div>

        {/* Right: Books Grid - Full width on mobile */}
        <div className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100 overflow-y-auto relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-100/5 rounded-full blur-3xl" />
            <div className="absolute bottom-32 left-10 w-48 h-48 bg-slate-200/10 rounded-full blur-3xl" />
          </div>
          
          <div className="p-4 md:p-8 max-w-2xl mx-auto relative z-10">
            {/* Header */}
            <div className="mb-4 md:mb-8 pt-8 md:pt-0">
              <h2 className="font-serif text-2xl md:text-3xl text-slate-800 mb-1 md:mb-2">Input Data</h2>
              <p className="text-xs md:text-sm text-slate-500">
                Collected wisdom from philosophy, psychology, and consciousness studies
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
              {['all', 'philosophy', 'manga', 'psychology'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setCurrentFilter(filter)}
                  className={`px-2 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-medium uppercase tracking-wider rounded border transition-all ${
                    currentFilter === filter
                      ? 'border-yellow-600 bg-yellow-50 text-yellow-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-yellow-600'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter === 'manga' ? 'Manga' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Books Grid - 3 columns on mobile, 4 on desktop - smaller book sizes */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.02 }}
                  onClick={() => openBookDetail(book)}
                  className="cursor-pointer group"
                >
                  <div className="relative aspect-[2/3] mb-1.5 rounded overflow-hidden border border-slate-200 group-hover:border-yellow-600 transition-all shadow-sm hover:shadow-md">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    {/* Category badge */}
                    <div className="absolute top-0.5 right-0.5 md:top-1 md:right-1 bg-yellow-600/90 backdrop-blur-sm text-white text-[6px] md:text-[8px] font-semibold px-0.5 md:px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {book.category === 'manga' ? '🎬' : book.category === 'psychology' ? '🧠' : '📚'}
                    </div>
                  </div>
                  <h3 className="font-serif text-[8px] md:text-[10px] text-slate-800 group-hover:text-yellow-600 transition-colors line-clamp-1 leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-[6px] md:text-[8px] text-slate-500 mt-0.5 truncate">{book.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
            onClick={closeBookDetail}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-4 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={closeBookDetail}
                className="absolute top-2 right-2 md:top-4 md:right-4 text-slate-400 hover:text-slate-600 text-xl md:text-2xl z-10"
              >
                ✕
              </button>

              {/* Left: Cover */}
              <div className="flex items-center justify-center">
                <motion.img
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                  className="w-32 md:w-full max-w-xs rounded-lg shadow-2xl"
                />
              </div>

              {/* Right: Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col justify-start"
              >
                <h2 className="font-serif text-lg md:text-2xl text-slate-800 mb-2">
                  {selectedBook.title}
                </h2>
                <p className="text-yellow-600 font-medium text-xs md:text-sm mb-1">{selectedBook.author}</p>
                <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider mb-4">{selectedBook.genre}</p>

                <div className="h-px bg-slate-200 my-4" />

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {selectedBook.summary}
                </p>

                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-widest text-slate-700 font-semibold mb-2">
                    Core Idea
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedBook.coreIdea}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-slate-700 font-semibold mb-3">
                    Reality Rating
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1 bg-slate-200 rounded overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(selectedBook.realityRating / 10) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 min-w-fit">
                      {selectedBook.realityRating}/10
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
