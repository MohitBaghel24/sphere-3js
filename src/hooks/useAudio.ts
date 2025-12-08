import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/store/useStore';

// Global audio context and state to persist across component re-renders
let globalAudioContext: AudioContext | null = null;
let globalMasterGain: GainNode | null = null;
let ambientStarted = false;

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const { isSoundEnabled, toggleSound } = useStore();

  // Initialize audio context
  const initAudioContext = useCallback(() => {
    if (!globalAudioContext) {
      const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      globalAudioContext = new AudioContextConstructor();
      
      // Create master gain for volume control
      globalMasterGain = globalAudioContext.createGain();
      globalMasterGain.gain.setValueAtTime(1, globalAudioContext.currentTime);
      globalMasterGain.connect(globalAudioContext.destination);
    }
    
    audioContextRef.current = globalAudioContext;
    masterGainRef.current = globalMasterGain;
    
    return globalAudioContext;
  }, []);

  // Create the ambient audio - Interstellar main theme inspired
  const createAmbientSound = useCallback((ctx: AudioContext, masterGain: GainNode) => {
    const now = ctx.currentTime;

    // === DEEP ORGAN BASS (A minor, Interstellar foundation) ===
    [55, 82.4, 110].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 1.002, now);
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.05 + i * 0.01, now);
      lfoGain.gain.setValueAtTime(freq * 0.003, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      gain.gain.setValueAtTime(0.06 / (i + 1), now);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc2.start(now);
      lfo.start(now);
    });

    // === COSMIC PAD (Vastness, Interstellar feel) ===
    [164.8, 220, 329.6].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 0.998, now);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(1, now);
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.03 + i * 0.007, now);
      lfoGain.gain.setValueAtTime(freq * 0.005, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      gain.gain.setValueAtTime(0.025 / (i + 1), now);
      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc2.start(now);
      lfo.start(now);
    });

    // === HIGH ETHEREAL HARMONICS (Stars, wonder) ===
    [440, 554.4, 659.3, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const volumeLfo = ctx.createOscillator();
      const volumeLfoGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.04 + i * 0.01, now);
      lfoGain.gain.setValueAtTime(freq * 0.002, now);
      volumeLfo.type = 'sine';
      volumeLfo.frequency.setValueAtTime(0.02 + i * 0.005, now);
      volumeLfoGain.gain.setValueAtTime(0.005 / (i + 1), now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      volumeLfo.connect(volumeLfoGain);
      volumeLfoGain.connect(gain.gain);
      gain.gain.setValueAtTime(0.008 / (i + 1), now);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      lfo.start(now);
      volumeLfo.start(now);
    });

    // === DEEP SUB BASS (Gravity, weight) ===
    const subOsc = ctx.createOscillator();
    const subOsc2 = ctx.createOscillator();
    const subGain = ctx.createGain();
    const subLfo = ctx.createOscillator();
    const subLfoGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(32.7, now);
    subOsc2.type = 'sine';
    subOsc2.frequency.setValueAtTime(65.4, now);
    subLfo.type = 'sine';
    subLfo.frequency.setValueAtTime(0.015, now);
    subLfoGain.gain.setValueAtTime(2, now);
    subLfo.connect(subLfoGain);
    subLfoGain.connect(subOsc.frequency);
    subGain.gain.setValueAtTime(0.07, now);
    subOsc.connect(subGain);
    subOsc2.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(now);
    subOsc2.start(now);
    subLfo.start(now);

    // === ORGAN FIFTHS (Classic Interstellar interval) ===
    [73.4, 110, 146.8].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.025, now);
      lfoGain.gain.setValueAtTime(freq * 0.004, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      gain.gain.setValueAtTime(0.02 / (i + 1), now);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      lfo.start(now);
    });
  }, []);

  // Start ambient audio
  const startAmbientAudio = useCallback(() => {
    const ctx = initAudioContext();
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    if (!ambientStarted && globalMasterGain) {
      // Start with volume at 0, then fade in smoothly
      globalMasterGain.gain.setValueAtTime(0, ctx.currentTime);
      createAmbientSound(ctx, globalMasterGain);
      ambientStarted = true;
      
      // Smooth fade in
      globalMasterGain.gain.linearRampToValueAtTime(
        isSoundEnabled ? 1 : 0, 
        ctx.currentTime + 0.5
      );
    }
  }, [initAudioContext, createAmbientSound, isSoundEnabled]);

  // Update volume when sound state changes
  useEffect(() => {
    if (globalAudioContext && globalMasterGain) {
      if (globalAudioContext.state === 'suspended') {
        globalAudioContext.resume();
      }
      // Smooth fade to avoid clicking/popping sounds
      const currentTime = globalAudioContext.currentTime;
      globalMasterGain.gain.cancelScheduledValues(currentTime);
      globalMasterGain.gain.setValueAtTime(globalMasterGain.gain.value, currentTime);
      globalMasterGain.gain.linearRampToValueAtTime(
        isSoundEnabled ? 1 : 0, 
        currentTime + 0.3
      );
    }
  }, [isSoundEnabled]);

  // Auto-start on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      startAmbientAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [startAmbientAudio]);

  // Play ring click sound - minimalistic
  const playRingClick = useCallback(() => {
    if (!isSoundEnabled) return;
    
    const ctx = initAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const now = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(520, now);
    oscillator.frequency.exponentialRampToValueAtTime(280, now + 0.06);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    oscillator.start(now);
    oscillator.stop(now + 0.08);
    
    // Start ambient if not started
    if (!ambientStarted) {
      startAmbientAudio();
    }
  }, [isSoundEnabled, initAudioContext, startAmbientAudio]);

  return {
    playRingClick,
    startAmbientAudio,
  };
};
