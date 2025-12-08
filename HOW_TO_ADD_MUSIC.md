# 🎵 How to Add Background Music

## Why I Can't Add Interstellar Music

The Interstellar soundtrack is copyrighted by Hans Zimmer and the film's production company. Using it without a license would be copyright infringement.

## Legal Alternatives

### Option 1: Royalty-Free Space Ambient Music (Recommended)

Download free space ambient music from these sources:

1. **Pixabay Music** (100% Free)
   - https://pixabay.com/music/search/space%20ambient/
   - Search: "space ambient", "cinematic drone", "atmospheric"

2. **Free Music Archive**
   - https://freemusicarchive.org/
   - Search: "ambient space"

3. **YouTube Audio Library** (Free for YouTube use)
   - https://studio.youtube.com/channel/audio

### How to Add Your Downloaded Music:

1. Download an MP3 file
2. Rename it to `background-ambient.mp3`
3. Place it in: `public/audio/background-ambient.mp3`
4. Restart the app

```bash
# Example
cp ~/Downloads/space-ambient-music.mp3 public/audio/background-ambient.mp3
```

### Option 2: Use the Generated Ambient (Current)

The app currently generates cinematic space ambient music using Web Audio API:
- Deep organ-like bass drones
- Ethereal pad harmonies
- High shimmer (like stars)
- Sub-bass cosmic rumble

This is **original music** generated in real-time, so no copyright issues!

### Option 3: License the Real Music

If you want to use the actual Interstellar soundtrack:
- Contact Warner Bros. Pictures for licensing
- Or use Epidemic Sound/Artlist for similar cinematic music (paid subscription)

## Current Generated Ambient Features

The app generates space ambient with:
- **Bass drone**: Church organ-style deep notes (C1, G1, C2, G2)
- **Ethereal pad**: Major chord harmony (C3, E3, G3, C4)
- **Shimmer**: High twinkling (C5, E5, G5)
- **Sub-bass**: Deep cosmic rumble (25Hz)
- **LFO modulation**: Slow breathing effect on all layers

This creates an Interstellar-*inspired* atmosphere without copyright issues!

## Recommended Free Tracks

Search these terms on Pixabay:
- "interstellar ambient"
- "space drone"
- "cinematic atmospheric"
- "sci-fi background"
- "cosmic meditation"
