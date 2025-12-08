import * as THREE from 'three';

// ============================================
// Setup
// ============================================
const canvas = document.getElementById('canvas');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ============================================
// Mouse tracking
// ============================================
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// ============================================
// Main group for the orb
// ============================================
const group = new THREE.Group();
scene.add(group);

// ============================================
// Create concentric ring circles
// ============================================
const totalRings = 25;

for (let i = 0; i < totalRings; i++) {
  const t = i / (totalRings - 1);
  
  // Radius grows from center outward
  const radius = 0.08 + Math.pow(t, 0.7) * 1.4;
  
  // Z depth - creates tunnel/eye effect
  const z = (t - 0.5) * 3;
  
  // Circle geometry
  const segments = 100;
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  
  for (let j = 0; j <= segments; j++) {
    const theta = (j / segments) * Math.PI * 2;
    vertices.push(
      Math.cos(theta) * radius,
      Math.sin(theta) * radius,
      0
    );
  }
  
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  
  // Opacity: inner rings more visible, outer rings fade
  const opacity = 0.06 + (1 - t) * 0.12;
  
  const material = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: opacity,
  });
  
  const circle = new THREE.LineLoop(geometry, material);
  circle.position.z = z;
  
  group.add(circle);
}

// ============================================
// Add tiny center dot
// ============================================
const dotGeometry = new THREE.CircleGeometry(0.015, 32);
const dotMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0.4,
});
const dot = new THREE.Mesh(dotGeometry, dotMaterial);
dot.position.z = 1.5;
group.add(dot);

// ============================================
// Event handlers
// ============================================
function onMouseMove(event) {
  targetX = (event.clientX / window.innerWidth - 0.5) * 2;
  targetY = (event.clientY / window.innerHeight - 0.5) * 2;
}

function onTouchMove(event) {
  if (event.touches.length === 1) {
    targetX = (event.touches[0].clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.touches[0].clientY / window.innerHeight - 0.5) * 2;
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('touchmove', onTouchMove, { passive: true });
window.addEventListener('resize', onResize);

// ============================================
// Animation loop
// ============================================
function animate() {
  requestAnimationFrame(animate);
  
  // Smooth easing toward target
  mouseX += (targetX - mouseX) * 0.08;
  mouseY += (targetY - mouseY) * 0.08;
  
  // Apply rotation to group
  group.rotation.y = mouseX * 0.6;
  group.rotation.x = mouseY * 0.5;
  
  renderer.render(scene, camera);
}

animate();
