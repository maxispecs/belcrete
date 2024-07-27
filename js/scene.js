
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export const setupControls = (showcase) => {
    let controls = new OrbitControls(showcase.camera, showcase.orbitControlsContainer);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    return controls;
}


export const setupRenderer = () => {

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha channel
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Set background color to transparent
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.zIndex = 3; // Ensure the canvas is on top
    return renderer;

}



export const setupLights = (showcase) => {

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    showcase.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    showcase.scene.add(pointLight);

}