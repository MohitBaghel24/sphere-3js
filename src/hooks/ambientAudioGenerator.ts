/**
 * Cinematic Space Ambient Music Generator
 * Creates deep, atmospheric drone inspired by sci-fi film scores
 * Uses Web Audio API to generate original ambient soundscape
 */

export function createAmbientAudio(audioContext: AudioContext): void {
  try {
    const now = audioContext.currentTime;
    
    // Create a master gain to control overall volume
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.12, now);
    masterGain.connect(audioContext.destination);

    // === DEEP ORGAN-LIKE BASS DRONE ===
    const bassFrequencies = [32.7, 49, 65.4, 98]; // C1, G1, C2, G2 - church organ style
    
    bassFrequencies.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Very slow breathing LFO
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.05 + index * 0.02, now);
      lfoGain.gain.setValueAtTime(freq * 0.015, now);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.12 / (index + 1), now);
      
      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      lfo.start(now);
    });

    // === ETHEREAL PAD (space atmosphere) ===
    const padNotes = [130.81, 164.81, 196, 261.63]; // C3, E3, G3, C4 - major chord
    
    padNotes.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Ultra slow modulation
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.03 + index * 0.01, now);
      lfoGain.gain.setValueAtTime(freq * 0.008, now);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.025 / (index + 1), now);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      lfo.start(now);
    });

    // === HIGH SHIMMER (stars twinkling) ===
    const shimmerFreqs = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    shimmerFreqs.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.2 + index * 0.1, now);
      lfoGain.gain.setValueAtTime(freq * 0.005, now);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      // Very quiet shimmer
      gain.gain.setValueAtTime(0.008 / (index + 1), now);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      lfo.start(now);
    });

    // === SUB-BASS RUMBLE (cosmic depth) ===
    const subOsc = audioContext.createOscillator();
    const subGain = audioContext.createGain();
    const subLfo = audioContext.createOscillator();
    const subLfoGain = audioContext.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(25, now);

    subLfo.type = 'sine';
    subLfo.frequency.setValueAtTime(0.04, now);
    subLfoGain.gain.setValueAtTime(8, now);

    subLfo.connect(subLfoGain);
    subLfoGain.connect(subOsc.frequency);

    subGain.gain.setValueAtTime(0.15, now);

    subOsc.connect(subGain);
    subGain.connect(masterGain);

    subOsc.start(now);
    subLfo.start(now);

  } catch (error) {
    console.error('Error creating ambient audio:', error);
  }
}
