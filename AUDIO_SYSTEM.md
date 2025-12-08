# Audio System Implementation

This document describes the audio features that have been added to the Spheree project.

## Features

### 1. **Ring Click Sound**
When you click on any ring in the interactive eye, a pleasant multi-layered click sound is played. The sound features:
- Two-tone frequency sweep (800Hz → 200Hz)
- Quick attack with smooth exponential decay
- Layered oscillators for a richer sound

### 2. **Background Ambient Music**
The application now plays an Interstellar-like ambient drone music in the background:
- **Deep resonant bass frequencies** (55Hz, 110Hz, 165Hz) creating a cinematic atmosphere
- **Low-frequency oscillation (LFO) modulation** for subtle, organic movement
- **Shimmer layer** with higher harmonics for ethereal quality
- **Smooth ambient sound** that complements the visual experience

### 3. **Sound Toggle Control**
A sound control button is located in the bottom-right corner of the screen:
- **Volume icon** appears when sound is enabled
- **Muted icon** appears when sound is disabled
- **Smooth animation** when toggling between states

## How to Add Custom Background Music

The system supports both:
1. **External audio files** (MP3, WAV, OGG, etc.)
2. **Generated ambient audio** (Web Audio API fallback)

### To add your own background music:

1. Place your audio file in the `public/audio/` directory:
   ```
   public/audio/background-ambient.mp3
   ```

2. The system will automatically use your audio file if available. If the file fails to load, it falls back to the generated ambient audio.

3. Supported formats:
   - MP3
   - WAV
   - OGG
   - FLAC
   - AAC

### Customizing Audio Parameters

#### Ring Click Sound
Edit the parameters in `src/hooks/useAudio.ts` in the `playRingClick()` function:
```typescript
const baseFreq = 600 + i * 150;  // Adjust base frequency
oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, now + 0.2);  // Adjust sweep
gain.gain.setValueAtTime(0.2 / (i + 1), now);  // Adjust volume
```

#### Background Ambient Music
Edit the parameters in `src/hooks/ambientAudioGenerator.ts`:
```typescript
const frequencies = [55, 110, 165];  // Adjust bass frequencies
lfo.frequency.setValueAtTime(0.5 + index * 0.1, now);  // Adjust LFO modulation speed
lfoGain.gain.setValueAtTime(5, now);  // Adjust LFO depth
```

## Audio State Management

Audio state is managed through the Zustand store (`src/store/useStore.ts`):
- `isSoundEnabled` - Boolean state for whether sound is active
- `toggleSound()` - Action to toggle sound on/off

The `useAudio()` hook automatically respects this state and pause/resume audio accordingly.

## Browser Compatibility

- **AudioContext API**: Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- **HTML5 Audio**: Supported for external audio files
- **Fallback**: If external audio fails, the system generates ambient audio using Web Audio API

## Notes

- Browser autoplay policies may prevent sound from starting automatically. A user interaction (click/touch) may be required to initiate playback on first visit.
- Sound state persists during the session but resets on page reload (can be enhanced with localStorage if needed).
- The generated ambient audio runs indefinitely for uninterrupted background music.
