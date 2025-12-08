# 🎵 Audio System - Quick Reference

## What Was Added

✅ **Ring Click Sound** - Plays when clicking interactive rings
✅ **Background Ambient Music** - Interstellar-like drone in background  
✅ **Sound Toggle Button** - Control audio in bottom-right corner

---

## Usage

### For Users
1. Open the app
2. Click the volume icon (🔊) in bottom-right to toggle sound
3. Click rings to hear click sounds
4. Enjoy the Interstellar-like ambient music!

### For Developers

#### Add Custom Background Music
```bash
# 1. Get an MP3 file (or convert to MP3)
# 2. Place in public/audio/
cp your-music.mp3 public/audio/background-ambient.mp3
# 3. Restart app - it will use your music!
```

#### Adjust Audio Parameters
**File**: `src/hooks/useAudio.ts`
```typescript
// Click sound volume
gain.gain.setValueAtTime(0.3, now);  // Change 0.3 to desired level

// Background music volume
audio.volume = 0.2;  // Change 0.2 to desired level (0.0-1.0)
```

**File**: `src/hooks/ambientAudioGenerator.ts`
```typescript
// Bass frequencies
const frequencies = [55, 110, 165];  // Lower = deeper

// LFO wobble speed
lfo.frequency.setValueAtTime(0.5 + index * 0.1, now);  // Lower = slower

// Overall volume
masterGain.gain.setValueAtTime(0.1, now);  // 0.0-1.0
```

---

## Files Overview

| File | Purpose |
|------|---------|
| `src/hooks/useAudio.ts` | Main audio hook - click sounds & background music control |
| `src/hooks/ambientAudioGenerator.ts` | Generates Interstellar-like ambient music |
| `src/components/TheEye.tsx` | Integrated to play click sound on ring click |
| `src/components/SideMenu.tsx` | Added sound toggle button |
| `public/audio/` | Place custom MP3 here (optional) |

---

## Audio Behavior

### Click Sound
- **When**: User clicks a ring
- **Duration**: ~0.25 seconds
- **Type**: Frequency sweep 800Hz → 200Hz
- **Volume**: Respects sound toggle

### Background Music
- **When**: App loads (or first user interaction)
- **Duration**: Infinite loop
- **Type**: Generated OR custom MP3
- **Volume**: Respects sound toggle (~20%)

### Sound Toggle
- **Location**: Bottom-right corner
- **Icon**: 🔊 (on) / 🔇 (off)
- **Effect**: Controls all audio on/off

---

## Troubleshooting

**No sound?**
- Check if toggle is ON (🔊 icon visible)
- Browser may require user interaction for autoplay
- Check browser console (F12) for errors
- Verify volume is not muted system-wide

**Custom music not playing?**
- File must be named: `background-ambient.mp3`
- Must be in: `public/audio/` folder
- Must be MP3 format
- Restart dev server after placing file

**Click sound too loud/quiet?**
- Edit line in `src/hooks/useAudio.ts`: `gain.gain.setValueAtTime(0.3, now);`
- Change `0.3` to desired volume (0.0-1.0)

---

## Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox  
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer

---

## Key Features

- 🎵 **No external dependencies** for audio generation (uses Web Audio API)
- 🎼 **Automatic fallback** to generated audio if custom file unavailable
- 🎚️ **Easy control** with simple toggle button
- 📱 **Mobile friendly** - works on iOS and Android
- ⚡ **Performance optimized** - minimal CPU usage
- 🔧 **Fully customizable** - adjust frequencies, volumes, durations

---

## Learning Resources

- [Web Audio API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Oscillator Frequency](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency)
- [Zustand Store](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)

---

## What Users Hear

🎶 **Ambient Music**: Deep, cinematic drone similar to Interstellar soundtrack
- Resonant bass frequencies for gravitas
- LFO modulation for organic movement
- Subtle shimmer layer for ethereal quality

🔔 **Click Sound**: Pleasant ring effect when clicking
- Frequency sweep for natural feel
- Multi-layer for richness
- Quick decay for responsiveness

---

## Next Steps (Optional)

- Add volume slider for fine control
- Multiple ambient tracks that rotate
- Sound visualization effects
- Save audio preferences to localStorage
- Add more interactive sound effects

---

## Support & Questions

All audio features are documented in:
- `AUDIO_SYSTEM.md` - Technical docs
- `AUDIO_IMPLEMENTATION.md` - Implementation details  
- `CUSTOM_MUSIC_GUIDE.md` - Custom music setup
- `AUDIO_COMPLETE_SUMMARY.md` - Full overview

---

## 🎉 You're All Set!

Your interactive eye now has immersive audio. Enjoy! 🚀🎵
