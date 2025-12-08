import { create } from 'zustand';

export type SectionId = 'about' | 'works' | 'philosophy' | 'experiments' | 'contact' | null;

interface StoreState {
  // Navigation state
  activeSection: SectionId;
  isZoomed: boolean;
  hoveredRing: number | null;
  
  // Step-based unlock system
  currentStep: number; // 1-5, only this ring is clickable
  
  // Audio state
  isSoundEnabled: boolean;
  
  // Actions
  setActiveSection: (section: SectionId) => void;
  setIsZoomed: (zoomed: boolean) => void;
  setHoveredRing: (ring: number | null) => void;
  toggleSound: () => void;
  
  // Combined action for opening a section
  openSection: (section: SectionId) => void;
  closeSection: () => void;
  advanceStep: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  activeSection: null,
  isZoomed: false,
  hoveredRing: null,
  currentStep: 0, // Start at step 0 (About - sectionIndex 0)
  isSoundEnabled: true,
  
  // Actions
  setActiveSection: (section) => set({ activeSection: section }),
  setIsZoomed: (zoomed) => set({ isZoomed: zoomed }),
  setHoveredRing: (ring) => set({ hoveredRing: ring }),
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  
  // Combined actions
  openSection: (section) => set({ 
    activeSection: section, 
    isZoomed: true 
  }),
  closeSection: () => set((state) => ({ 
    activeSection: null, 
    isZoomed: false,
    currentStep: Math.min(state.currentStep + 1, 4),
  })),
  advanceStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, 4),
  })),
}));

// Ring to section mapping (1-indexed for clarity)
// Ring 1 → About, Ring 2 → Works, etc.
export const RING_SECTIONS: SectionId[] = [
  'about',      // Ring 1
  'works',      // Ring 2
  'philosophy', // Ring 3
  'experiments',// Ring 4
  'contact',    // Ring 5
];

export const SECTION_TITLES: Record<Exclude<SectionId, null>, string> = {
  about: 'About',
  works: 'Works',
  philosophy: 'Philosophy',
  experiments: 'Experiments',
  contact: 'Contact',
};
