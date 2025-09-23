// --- 3D INTERACTIVE SPHERE ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// --- GEOMETRY (THE PARTICLES) ---
const particleCount = 5000;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 60; // Spread particles randomly
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// --- MATERIAL (HOW PARTICLES LOOK) ---
const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xa8a2c7,
    blending: THREE.AdditiveBlending,
});

const particleSphere = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSphere);

// --- MOUSE INTERACTION ---
const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// --- ANIMATION LOOP ---
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Make the sphere rotate
    particleSphere.rotation.y = elapsedTime * 0.1;
    particleSphere.rotation.x = elapsedTime * 0.1;
    
    // Make the sphere react to mouse movement
    particleSphere.rotation.y += mouse.x * 0.2;
    particleSphere.rotation.x += mouse.y * 0.2;

    renderer.render(scene, camera);
}

animate();

// --- HANDLE WINDOW RESIZE ---
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});