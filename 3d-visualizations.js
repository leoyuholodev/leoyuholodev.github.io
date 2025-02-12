// Particle Background
class ParticleBackground {
    constructor() {
        this.container = document.getElementById('particles-3d');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.particles = [];

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 30;

        // Create particles
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x007bff,
            size: 0.2,
            transparent: true,
            opacity: 0.8
        });

        this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particleSystem);

        this.animate();
        window.addEventListener('resize', () => this.onWindowResize());
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.particleSystem.rotation.y += 0.001;
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Skills Cube
class SkillsCube {
    constructor() {
        this.container = document.getElementById('skills-cube');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.init();
    }

    init() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        // Create cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0x007bff, opacity: 0.8, transparent: true }),
            new THREE.MeshBasicMaterial({ color: 0x00ff88, opacity: 0.8, transparent: true }),
            new THREE.MeshBasicMaterial({ color: 0xff0088, opacity: 0.8, transparent: true }),
            new THREE.MeshBasicMaterial({ color: 0x0088ff, opacity: 0.8, transparent: true }),
            new THREE.MeshBasicMaterial({ color: 0x88ff00, opacity: 0.8, transparent: true }),
            new THREE.MeshBasicMaterial({ color: 0xff8800, opacity: 0.8, transparent: true })
        ];

        this.cube = new THREE.Mesh(geometry, materials);
        this.scene.add(this.cube);

        // Add text to cube faces
        this.addTextToFaces(['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS']);

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 0.5;

        this.animate();
        window.addEventListener('resize', () => this.onWindowResize());
    }

    addTextToFaces(texts) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');

        texts.forEach((text, index) => {
            context.fillStyle = '#ffffff';
            context.font = 'bold 32px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, 128, 128);

            const texture = new THREE.CanvasTexture(canvas);
            this.cube.material[index].map = texture;
            context.clearRect(0, 0, 256, 256);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}

// Initialize 3D visualizations
document.addEventListener('DOMContentLoaded', () => {
    const particleBackground = new ParticleBackground();
    const skillsCube = new SkillsCube();
}); 