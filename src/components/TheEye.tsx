import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useStore, RING_SECTIONS, SectionId } from '@/store/useStore';
import { useAudio } from '@/hooks/useAudio';

// ============================================================
// CONFIGURATION - THE EYE PORTAL SYSTEM
// ============================================================
const CONFIG = {
  // Sphere setup - 8 concentric rings (5 clickable + 3 decorative)
  ringCount: 8,
  baseRadius: 0.15,
  radiusStep: 0.22,
  segments: 96,
  
  // Opacity states - less reflective, more subtle
  activeOpacity: 0.45,
  hoverOpacity: 0.7,
  lockedOpacity: 0.12,
  inactiveOpacity: 0.06,
  hiddenOpacity: 0.0,
  
  // Animation - smoother movement
  breatheSpeed: 0.35,
  breatheAmount: 0.015,
  rotationSpeed: 0.025,
  wobbleSpeed: 0.2,
  wobbleAmount: 0.012,
  
  // Mouse parallax - ultra smooth
  parallaxStrength: 0.45,
  parallaxEasing: 0.04,
  
  // Camera
  defaultCameraZ: 5,
  mobileCameraZ: 8.5, // New config for mobile
  zoomedCameraZ: 1.8,
  defaultFOV: 50,
  zoomedFOV: 42,
  
  // Colors - softer
  wireColor: '#3a3a3a',
  activeWireColor: '#1a1a1a',
  
  // Butterfly orbit rings
  orbitCount: 3,
  orbitRadius: 1.8,
  orbitSpeed: 0.3,
  orbitOpacity: 0.15,
};

// Section rings are at indices 1-5 (ring 0, 6, and 7 are decorative)
const SECTION_RING_INDICES = [1, 2, 3, 4, 5];

// Helper to get responsive camera Z
const getResponsiveZ = () => {
  return window.innerWidth <= 768 ? CONFIG.mobileCameraZ : CONFIG.defaultCameraZ;
};

// ============================================================
// WIREFRAME SPHERE WITH STEP-BASED ACTIVATION
// ============================================================
interface WireframeSphereProps {
  radius: number;
  ringIndex: number;
  sectionIndex: number | null;
  currentStep: number;
  isZoomed: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

function WireframeSphere({ 
  radius, 
  ringIndex, 
  sectionIndex,
  currentStep,
  isZoomed,
  isHovered,
  onClick, 
  onHover 
}: WireframeSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const rotationRef = useRef(0);
  const scaleRef = useRef({ value: 1 });
  
  const isSectionRing = sectionIndex !== null;
  const isUnlocked = isSectionRing && sectionIndex <= currentStep;
  const isClickable = isUnlocked && !isZoomed;
  
  // For zoom: check which section is currently active
  const { activeSection } = useStore();
  const isActiveSection = isSectionRing && RING_SECTIONS[sectionIndex] === activeSection;
  
  // Rotation
  const rotationDirection = ringIndex % 2 === 0 ? 1 : -1;
  const rotationSpeed = CONFIG.rotationSpeed * (1 - ringIndex * 0.06);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // More dynamic movement - subtle rotation + wobble
    if (!isZoomed) {
      const time = state.clock.elapsedTime;
      // Gentle continuous rotation
      meshRef.current.rotation.y += CONFIG.rotationSpeed * 0.01 * rotationDirection;
      // Multi-axis wobble for organic feel
      meshRef.current.rotation.z = Math.sin(time * CONFIG.wobbleSpeed + ringIndex * 0.4) * CONFIG.wobbleAmount;
      meshRef.current.rotation.x = Math.PI / 2 + Math.cos(time * CONFIG.wobbleSpeed * 0.7 + ringIndex * 0.3) * CONFIG.wobbleAmount * 0.5;
    }
  });
  
  // Animate opacity and scale based on state
  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;
    
    let targetOpacity: number;
    let targetScale = 1;
    
    // Center core breathing - makes it feel "alive"
    const isCenterCore = ringIndex === 0;
    if (isCenterCore && !isZoomed) {
      const time = state.clock.elapsedTime;
      // Slow breathing: 1 → 1.03 → 1 (very subtle)
      const breathe = 1 + Math.sin(time * 0.8) * 0.03;
      targetScale = breathe;
    }
    
    if (isZoomed) {
      // When zoomed: active section ring scales up, others fade out
      if (isActiveSection) {
        targetOpacity = CONFIG.activeOpacity;
        targetScale = 1.15;
      } else {
        targetOpacity = CONFIG.hiddenOpacity;
        targetScale = 0.85;
      }
    } else {
      // Normal state - step-based unlocking
      if (isSectionRing) {
        if (isUnlocked) {
          targetOpacity = isHovered ? CONFIG.hoverOpacity : CONFIG.activeOpacity;
        } else {
          targetOpacity = CONFIG.lockedOpacity;
        }
      } else {
        // Decorative rings (0 and 6, 7)
        // Center core has slightly higher opacity to feel more present
        targetOpacity = isCenterCore ? 0.4 : CONFIG.inactiveOpacity;
      }
    }
    
    // Smooth interpolation - slower for smoother motion
    materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.05;
    scaleRef.current.value += (targetScale - scaleRef.current.value) * 0.04;
    
    const s = scaleRef.current.value;
    meshRef.current.scale.set(s, s, s);
  });
  
  return (
    <mesh
      ref={meshRef}
      rotation={[Math.PI / 2, 0, 0]}
      renderOrder={100 - ringIndex}
      onClick={(e) => {
        if (!isClickable) return;
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        if (!isClickable) return;
        e.stopPropagation();
        onHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHover(false);
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[radius, CONFIG.segments, CONFIG.segments]} />
      <meshBasicMaterial
        ref={materialRef}
        color={isSectionRing ? CONFIG.activeWireColor : CONFIG.wireColor}
        wireframe
        transparent
        opacity={CONFIG.activeOpacity}
        depthWrite={false}
      />
    </mesh>
  );
}

// ============================================================
// BUTTERFLY ORBIT RING - Figure-8 pattern around sphere
// ============================================================
interface ButterflyOrbitProps {
  index: number;
  isZoomed: boolean;
}

function ButterflyOrbit({ index, isZoomed }: ButterflyOrbitProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.LineLoop>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  
  // Create ring geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const segments = 128;
    
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      vertices.push(
        Math.cos(theta) * CONFIG.orbitRadius,
        Math.sin(theta) * CONFIG.orbitRadius,
        0
      );
    }
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);
  
  // Animate with figure-8 / butterfly pattern
  useFrame((state) => {
    if (!groupRef.current || !materialRef.current) return;
    
    const time = state.clock.elapsedTime;
    const speed = CONFIG.orbitSpeed * (1 + index * 0.15);
    const phase = (index * Math.PI * 2) / CONFIG.orbitCount;
    
    // Figure-8 / Lissajous curve motion
    const angle = time * speed + phase;
    
    // Rotate the ring itself
    groupRef.current.rotation.x = Math.sin(angle) * 0.8;
    groupRef.current.rotation.y = angle;
    groupRef.current.rotation.z = Math.cos(angle * 0.5) * 0.3;
    
    // Wobble the tilt for butterfly effect
    const tilt = Math.sin(time * speed * 0.7 + phase) * 0.4;
    groupRef.current.rotation.x += tilt;
    
    // Fade out when zoomed
    const targetOpacity = isZoomed ? 0.02 : CONFIG.orbitOpacity;
    materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.05;
  });
  
  return (
    <group ref={groupRef}>
      <lineLoop ref={ringRef} geometry={geometry}>
        <lineBasicMaterial
          ref={materialRef}
          color="#5a5a5a"
          transparent
          opacity={CONFIG.orbitOpacity}
          linewidth={1}
        />
      </lineLoop>
    </group>
  );
}

// ============================================================
// THE EYE SCENE
// ============================================================
function TheEyeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  const { playRingClick } = useAudio();
  
  // Mouse tracking for parallax
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  
  // Current viewport width for responsive camera
  const [targetZ, setTargetZ] = useState(getResponsiveZ());
  
  const { 
    isZoomed, 
    hoveredRing, 
    setHoveredRing, 
    openSection,
    currentStep,
  } = useStore();
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setTargetZ(getResponsiveZ());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Mouse move handler for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        targetRef.current.x = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        targetRef.current.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);
  
  // GSAP camera zoom with FOV animation
  useEffect(() => {
    const cam = cameraRef.current as THREE.PerspectiveCamera;
    
    if (isZoomed) {
      // Zoom IN
      gsap.to(cam.position, {
        z: CONFIG.zoomedCameraZ,
        duration: 1.2,
        ease: 'power3.inOut',
      });
      gsap.to(cam, {
        fov: CONFIG.zoomedFOV,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: () => cam.updateProjectionMatrix(),
      });
    } else {
      // Zoom OUT - use dynamic targetZ
      gsap.to(cam.position, {
        z: targetZ,
        duration: 1.0,
        ease: 'power3.out',
      });
      gsap.to(cam, {
        fov: CONFIG.defaultFOV,
        duration: 1.0,
        ease: 'power3.out',
        onUpdate: () => cam.updateProjectionMatrix(),
      });
    }
  }, [isZoomed, targetZ]); // Add targetZ dependency to update when screen resizes
  
  // Generate ring configurations
  const rings = useMemo(() => {
    const ringArray = Array.from({ length: CONFIG.ringCount }, (_, i) => {
      const radius = CONFIG.baseRadius + i * CONFIG.radiusStep;
      const sectionIndex = SECTION_RING_INDICES.indexOf(i);
      const section = sectionIndex !== -1 ? RING_SECTIONS[sectionIndex] : null;
      
      return {
        radius,
        ringIndex: i,
        sectionIndex: sectionIndex !== -1 ? sectionIndex : null,
        section,
      };
    });
    // Reverse so inner rings render LAST (on top for click detection)
    return ringArray.reverse();
  }, []);
  
  // Animation loop - smooth parallax like anandmaj.com
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth parallax easing - gentle follow
    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * CONFIG.parallaxEasing;
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * CONFIG.parallaxEasing;
    
    if (!isZoomed) {
      // Apply smooth mouse parallax rotation (like anandmaj.com)
      groupRef.current.rotation.y = mouseRef.current.x * CONFIG.parallaxStrength;
      groupRef.current.rotation.x = mouseRef.current.y * CONFIG.parallaxStrength * 0.8;
      
      // Breathing animation
      const breathe = 1 + Math.sin(state.clock.elapsedTime * CONFIG.breatheSpeed) * CONFIG.breatheAmount;
      groupRef.current.scale.set(breathe, breathe, breathe);
    } else {
      // Ease back to center when zoomed
      groupRef.current.rotation.y += (0 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * 0.05;
    }
  });
  
  const handleRingClick = async (section: SectionId) => {
    if (!section) return;
    playRingClick();
    openSection(section);
  };
  
  const handleRingHover = (sectionIndex: number | null, hovered: boolean) => {
    if (sectionIndex === null) return;
    setHoveredRing(hovered ? sectionIndex : null);
  };
  
  return (
    <group ref={groupRef}>
      {rings.map((ring) => (
        <WireframeSphere
          key={ring.ringIndex}
          radius={ring.radius}
          ringIndex={ring.ringIndex}
          sectionIndex={ring.sectionIndex}
          currentStep={currentStep}
          isZoomed={isZoomed}
          isHovered={hoveredRing === ring.sectionIndex}
          onClick={() => ring.section && handleRingClick(ring.section)}
          onHover={(hovered) => handleRingHover(ring.sectionIndex, hovered)}
        />
      ))}
      
      {/* Butterfly orbit rings */}
      {Array.from({ length: CONFIG.orbitCount }).map((_, i) => (
        <ButterflyOrbit key={`orbit-${i}`} index={i} isZoomed={isZoomed} />
      ))}
    </group>
  );
}

// ============================================================
// MAIN CANVAS COMPONENT
// ============================================================
export default function TheEye() {
  // We need initial state safe for SSR/Hydration, though this is CLIENT only usually in Vite.
  // Using a state initialized function is fine.
  const [initialZ] = useState(getResponsiveZ());

  return (
    <div className="fixed inset-0">
      <Canvas
        camera={{ position: [0, 0, initialZ], fov: CONFIG.defaultFOV }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#ffffff']} />
        <TheEyeScene />
      </Canvas>
    </div>
  );
}

