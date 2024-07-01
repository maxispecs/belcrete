import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
// import { GUI } from 'https://cdn.skypack.dev/lil-gui@0.17.0';

// import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture loader
const textureLoader = new THREE.TextureLoader();
const concreteTexture = textureLoader.load('/textures/brushed_concrete_2_diff_4k.jpg'); // Replace with your texture URL
const aoMap = textureLoader.load('/textures/brushed_concrete_2_ao_4k.jpg'); // Replace with your texture URL
const normal = textureLoader.load('/textures/brushed_concrete_2_nor_gl_4k.jpg'); // Replace with your texture URL

// Material with texture
const material = new THREE.MeshStandardMaterial({
    map: concreteTexture,
    // aoMap: aoMap,
    // normalMap: normal
});

// Geometry
const geometry = new THREE.BoxGeometry();

// Mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();