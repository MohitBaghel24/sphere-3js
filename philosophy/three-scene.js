// Three.js Scene - Almond Eye Visualization
class AlmondEyeScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.eyeMesh = null;
        this.particles = null;
        this.meshNetwork = null;
        this.time = 0;
        this.isZoomed = false;
        
        this.init();
        this.animate();
        this.setupMouseParallax();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xfaf9f7);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 3;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true, 
            alpha: false 
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        const softLight = new THREE.PointLight(0xd4af37, 0.3);
        softLight.position.set(-3, 3, 3);
        this.scene.add(softLight);
        
        // Create elements
        this.createAlmondEye();
        this.createParticles();
        this.createMeshNetwork();
        this.createAmbientGlow();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createAlmondEye() {
        const group = new THREE.Group();
        
        // Multiple concentric wireframe shells forming almond eye shape
        const shells = [
            { radius: 0.8, segments: 32, widthSegments: 32, opacity: 0.15 },
            { radius: 0.95, segments: 32, widthSegments: 32, opacity: 0.1 },
            { radius: 1.1, segments: 32, widthSegments: 32, opacity: 0.08 },
            { radius: 1.25, segments: 32, widthSegments: 32, opacity: 0.06 }
        ];
        
        shells.forEach((shellConfig, index) => {
            // Create stretched sphere for almond eye shape
            const geometry = new THREE.IcosahedronGeometry(shellConfig.radius, shellConfig.segments);
            
            // Stretch to create almond eye shape
            geometry.scale(1, 1.3, 1);
            
            // Apply taper
            const positions = geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                const z = positions[i + 2];
                
                // Taper at the ends
                const taper = Math.cos(z * Math.PI / 2);
                positions[i] *= taper;
                positions[i + 2] *= taper;
            }
            geometry.attributes.position.needsUpdate = true;
            
            const material = new THREE.LineBasicMaterial({
                color: 0x1a1a1a,
                opacity: shellConfig.opacity,
                transparent: true,
                linewidth: 1
            });
            
            const wireframe = new THREE.WireframeGeometry(geometry);
            const line = new THREE.LineSegments(wireframe, material);
            
            // Stagger rotation for depth
            line.rotation.y = index * Math.PI / 4;
            line.rotation.x = index * 0.15;
            
            group.add(line);
        });
        
        // Center pupil - soft glowing sphere
        const pupilGeometry = new THREE.SphereGeometry(0.15, 32, 32);
        const pupilMaterial = new THREE.MeshBasicMaterial({
            color: 0xd4af37,
            emissive: 0xd4af37,
            emissiveIntensity: 0.8
        });
        const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        pupil.scale.z = 0.6; // Flatten slightly
        group.add(pupil);
        
        // Add glow around pupil
        const glowGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xd4af37,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);
        
        this.eyeMesh = group;
        this.scene.add(group);
    }

    createParticles() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0xd4af37,
            size: 0.02,
            transparent: true,
            opacity: 0.4
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createMeshNetwork() {
        const segments = 15;
        const grid = [];
        
        // Create grid of points
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                grid.push(new THREE.Vector3(
                    (i - segments/2) * 0.4,
                    (j - segments/2) * 0.4,
                    (Math.sin(i * 0.5) + Math.cos(j * 0.5)) * 0.3
                ));
            }
        }
        
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        
        // Connect nearby points
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                const current = grid[i * segments + j];
                
                // Horizontal line
                if (j < segments - 1) {
                    const next = grid[i * segments + j + 1];
                    positions.push(current.x, current.y, current.z);
                    positions.push(next.x, next.y, next.z);
                }
                
                // Vertical line
                if (i < segments - 1) {
                    const next = grid[(i + 1) * segments + j];
                    positions.push(current.x, current.y, current.z);
                    positions.push(next.x, next.y, next.z);
                }
            }
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
        
        const material = new THREE.LineBasicMaterial({
            color: 0x1a1a1a,
            opacity: 0.1,
            transparent: true,
            linewidth: 0.5
        });
        
        this.meshNetwork = new THREE.LineSegments(geometry, material);
        this.meshNetwork.position.z = -3;
        this.scene.add(this.meshNetwork);
    }

    createAmbientGlow() {
        // Large semi-transparent sphere for ambient effect
        const glowGeometry = new THREE.SphereGeometry(5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.02,
            side: THREE.BackSide
        });
        const ambientGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(ambientGlow);
    }

    setupMouseParallax() {
        document.addEventListener('mousemove', (e) => {
            if (this.isZoomed) return;
            
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            
            gsap.to(this.eyeMesh.rotation, {
                x: y * 0.3,
                y: x * 0.3,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    zoomInToPupil(callback) {
        this.isZoomed = true;
        
        const timeline = gsap.timeline();
        
        timeline.to(this.camera.position, {
            z: 0.5,
            duration: 1.5,
            ease: "power2.inOut"
        }, 0);
        
        timeline.to(this.eyeMesh.rotation, {
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "power2.inOut"
        }, 0);
        
        timeline.to(this.eyeMesh.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 1.5,
            ease: "power2.inOut"
        }, 0);
        
        timeline.to(this.particles.material, {
            opacity: 0,
            duration: 1,
        }, 0.2);
        
        timeline.to(this.meshNetwork.material, {
            opacity: 0,
            duration: 1,
        }, 0.2);
        
        timeline.call(callback, [], 1.5);
    }

    zoomOutFromPupil() {
        this.isZoomed = false;
        
        const timeline = gsap.timeline();
        
        timeline.to(this.camera.position, {
            z: 3,
            duration: 1.5,
            ease: "power2.inOut"
        }, 0);
        
        timeline.to(this.eyeMesh.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.5,
            ease: "power2.inOut"
        }, 0);
        
        timeline.to(this.particles.material, {
            opacity: 0.4,
            duration: 1,
        }, 0.2);
        
        timeline.to(this.meshNetwork.material, {
            opacity: 0.1,
            duration: 1,
        }, 0.2);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.time += 0.0008;
        
        // Breathing animation
        const breathe = Math.sin(this.time * Math.PI * 0.8) * 0.05 + 1;
        this.eyeMesh.scale.set(breathe, breathe, breathe);
        
        // Slow rotation
        if (!this.isZoomed) {
            this.eyeMesh.rotation.z += 0.0002;
        }
        
        // Particle floating animation
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += Math.sin(this.time * 0.5 + i) * 0.0002;
                positions[i + 1] += Math.cos(this.time * 0.5 + i) * 0.0002;
                positions[i + 2] += Math.sin(this.time * 0.3 + i * 2) * 0.0001;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    getScene() {
        return this.scene;
    }

    getRenderer() {
        return this.renderer;
    }

    freeze() {
        this.isZoomed = true;
    }

    unfreeze() {
        this.isZoomed = false;
    }
}

// Initialize scene when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('three-canvas');
    window.almondEyeScene = new AlmondEyeScene(canvas);
});
