import { useEffect, useRef } from 'react';

// Very soft, barely visible film grain for cinematic luxury feel
export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Match canvas to window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Animate grain
    let animationId: number;
    
    const renderGrain = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Very subtle grain - barely visible
      for (let i = 0; i < data.length; i += 4) {
        // Random noise value
        const noise = Math.random() * 255;
        
        // Apply very subtle variation (almost imperceptible)
        data[i] = noise;     // R
        data[i + 1] = noise; // G
        data[i + 2] = noise; // B
        data[i + 3] = 8;     // Alpha - very low for subtle effect
      }
      
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(renderGrain);
    };
    
    renderGrain();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        mixBlendMode: 'overlay',
        opacity: 0.4,
      }}
    />
  );
}
