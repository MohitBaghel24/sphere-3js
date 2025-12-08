# Guide: Adding Custom Interstellar-like Background Music

## Quick Start

The easiest way to customize your background music:

1. **Find/Create an Interstellar-like ambient track**
   - Royalty-free options: 
     - Epidemic Sound (https://www.epidemicsound.com)
     - YouTube Audio Library
     - Free Music Archive (https://freemusicarchive.org)
     - Pixabay Music (https://pixabay.com/music)
   - Search for: "ambient", "drone", "space", "cinematic"

2. **Convert to MP3 format** (if needed)
   - Use ffmpeg: `ffmpeg -i input.wav -b:a 192k output.mp3`

3. **Place in the right folder**
   ```bash
   cp your-music.mp3 public/audio/background-ambient.mp3
   ```

4. **Done!** The app will automatically use your track

## Recommended Interstellar-like Music Characteristics

For the best "Interstellar" vibe, look for tracks with:
- ✅ Deep, resonant bass tones
- ✅ Minimal, ambient style (not too busy)
- ✅ Gradual evolution/development
- ✅ Slightly mysterious/ominous tone
- ✅ Duration: 3-10+ minutes (longer is better for looping)
- ✅ Slow tempo (60-80 BPM range)

## Example Search Terms

- "Ambient Space Music"
- "Cinematic Drone"
- "Interstellar Ambient"
- "Deep Space Soundscape"
- "Sci-Fi Background Music"
- "Minimalist Electronic"

## If You Don't Have Custom Music

The system will automatically generate an Interstellar-like ambient track using Web Audio API if no file is found. This generated track features:
- Deep bass drones (55Hz, 110Hz, 165Hz)
- LFO modulation for organic movement
- Shimmer layer for ethereal quality
- Infinite loop

## Advanced: Customize Generated Audio

If you want to modify the generated ambient audio, edit `src/hooks/ambientAudioGenerator.ts`:

```typescript
// Change bass frequencies
const frequencies = [55, 110, 165]; // Lower = deeper

// Change LFO (wobble) speed
lfo.frequency.setValueAtTime(0.5 + index * 0.1, now); // Lower = slower wobble

// Change LFO depth (modulation amount)
lfoGain.gain.setValueAtTime(5, now); // Higher = more modulation

// Change overall volume
masterGain.gain.setValueAtTime(0.1, now); // 0.0-1.0
```

## Audio File Size Considerations

For web performance:
- **Recommended size**: 2-5 MB for ~3-5 minute track
- **Maximum reasonable**: 10 MB
- **Format**: MP3 provides good balance of quality and file size
- **Bitrate**: 128-192 kbps is usually sufficient for ambient music

## Testing Your Setup

1. Start the dev server: `npm run build`
2. Open the app in your browser
3. Look for the volume icon in bottom-right corner
4. Toggle sound on/off to test your track
5. Click the rings to hear the click sound effect

## Troubleshooting

**No sound playing?**
- Check browser autoplay policies (may require user interaction)
- Check console for errors (F12 → Console)
- Verify file path: `public/audio/background-ambient.mp3`

**Audio file not loading?**
- Verify file format is supported (MP3, WAV, OGG, FLAC, AAC)
- Check file permissions
- Verify it's in the correct folder
- Check browser console for CORS or loading errors

**Audio keeps switching between custom and generated?**
- Make sure file has correct name: `background-ambient.mp3`
- Make sure it's in the `public/audio/` folder
- Restart the dev server
- Clear browser cache (Ctrl+Shift+Delete)

## Creating Your Own Ambient Music

If you want to create original Interstellar-like music:

### Option 1: Music Production Software
- FL Studio, Ableton, Logic Pro
- Create long, evolving ambient drones
- Use sine waves and subtle effects

### Option 2: AI Music Generation
- Amper Music
- AIVA
- MusicLM (Google)

### Option 3: Procedural Generation
- Already built into the app!
- Edit `ambientAudioGenerator.ts` for custom parameters

## License Considerations

⚠️ **Important**: Only use music you have rights to use. 

- Personal projects: Creative Commons or royalty-free music
- Commercial use: Purchase licenses from music platforms
- Always check the license before using

### Recommended free/cheap sources:
- Free Music Archive (free)
- Pixabay Music (free)
- Epidemic Sound (subscription)
- AudioJungle (one-time purchase)

---

Enjoy creating an immersive experience with your custom Interstellar-like soundtrack! 🎵🚀
