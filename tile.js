// import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
// import { GUI } from 'https://cdn.skypack.dev/lil-gui@0.17.0';
// import { OBJLoader } from 'https://cdn.skypack.dev/three@0.152.2/three/addons/loaders/OBJLoader.js'

import * as THREE from 'three';
// import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene, Camera, Renderer
const container = document.getElementById('rotating-stone');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha channel
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set background color to transparent
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.zIndex = 3; // Ensure the canvas is on top

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


// const loader = new GLTFLoader();
// loader.load('/objects/SwankyTrug-Inari.glb', function (gltf) {
//     scene.add(gltf.scene);
// }, undefined, function (error) {
//     console.error(error);
// });






const textureLoader = new THREE.TextureLoader();

// const textureName = 'rock_wall_03' ;
const textureName = 'brushed_concrete_2' ;
const textureNameSuffix = '';

let brick;

const diffuseTexture = textureLoader.load(`textures/${textureName}_diff${textureNameSuffix}.jpg`,
    texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        scene.add(brick);
    }); // Replace with your Diffuse texture URL

const normalTexture = textureLoader.load(`textures/${textureName}_nor_gl${textureNameSuffix}.jpg`); // Replace with your Normal texture URL
const armTexture = textureLoader.load(`textures/${textureName}_arm${textureNameSuffix}.jpg`); // Replace with your AO texture URL
// const roughnessTexture = textureLoader.load('/textures/brushed_concrete_2_rough_4k.jpg'); // Replace with your Roughness texture URL
// const displacementTexture = textureLoader.load('/textures/brushed_concrete_2_disp_4k.jpg'); // Replace with your Displacement texture URL


const material = new THREE.MeshStandardMaterial({
    map: diffuseTexture,
    normalMap: normalTexture,
    aoMap: armTexture,
    roughnessMap: armTexture,
    metalnessMap: armTexture,
    //displacementMap: displacementTexture,
    // displacementScale: 0.01
});




let obj1;
// Instantiate a loader
// const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
// loader.load(
//     // resource URL
//     '/objects/obj2.glb',
//     // called when the resource is loaded
//     function ( gltf ) {
//
//         const model = gltf.scene;
//
//         model.traverse((child) => {
//             if (child.isMesh) {
//                 console.log('Extracted mesh:', child);
//
//                 // Optionally apply a custom material
//                 // const customMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
//
//
//                 obj1 = child;
//                 // obj1.material = material;
//
//                 obj1.scale.set(0.1, .1, .1);
//
//                 const box = new THREE.Box3().setFromObject(obj1);
//                 const size = box.getSize(new THREE.Vector3());
//                 const center = box.getCenter(new THREE.Vector3());
//                 obj1.position.x -= center.x;
//                 obj1.position.y -= center.y ;
//                 obj1.position.z -= center.z;
//
//                 obj1.rotation.x += .9;
//
//                 // Add the mesh to the scene or manipulate it as needed
//                 // scene.add(obj1);
//                 // brick = obj1;
//                 // changeShape('RRect')
//             }
//         });
//
//         // scene.add( gltf.scene.children[0] );
//
//
//         // Adjust model scale and position if necessary
//         // model.scale.set(.05, .05, .05); // Scale the model if it's too small or large
//         // model.position.set(0, 0, 0); // Position the model if it's off-center
//         //
//         // const box = new THREE.Box3().setFromObject(model);
//         // const size = box.getSize(new THREE.Vector3());
//         // const center = box.getCenter(new THREE.Vector3());
//         //
//         // console.log('Model size:', size);
//         // console.log('Model center:', center);
//         //
//         // // Optionally, center the model
//         // model.position.x -= center.x;
//         // model.position.y -= center.y;
//         // model.position.z -= center.z;
//         //
//         // model.rotation.x += 2;
//         // // model.rotation.y += ;
//         //
//         // scene.add(model);
//         //
//         // obj1 = model;
//         //
//         // console.log('Model loaded:', model);
//         //
//         // // gltf.animations; // Array<THREE.AnimationClip>
//         // // gltf.scene; // THREE.Group
//         // // gltf.scenes; // Array<THREE.Group>
//         // // gltf.cameras; // Array<THREE.Camera>
//         // // gltf.asset; // Object
//         // console.log('loaded', gltf);
//     },
//     // called while loading is progressing
//     function ( xhr ) {
//
//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//
//     },
//     // called when loading has errors
//     function ( error ) {
//
//         console.log( 'An error happened' );
//
//     }
// );





const width = 2.25, height = .25, depth = 3.25;



// const objLoader = new OBJLoader();
// objLoader.load(
//     // resource URL
//     '/objects/obj1.obj',
//     // called when resource is loaded
//     function ( object ) {
//
//         console.log('loaded', object);
//         scene.add( object );
//         obj1 = object.children[0];
//
//     },
//     // called when loading is in progresses
//     function ( xhr ) {
//
//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//
//     },
//     // called when loading has errors
//     function ( error ) {
//
//         console.log( 'An error happened' );
//
//     }
// );

// Brick Geometry
const geometries = {
    Box: new THREE.BoxGeometry(width, height, depth),
    Sphere: new THREE.SphereGeometry(0.75, 32, 32),
    Cylinder: new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
    RRect: null
};

let currentGeometry = geometries.Box;

// Adjust UV mapping for each face to maintain aspect ratio
// const uvAttr = currentGeometry.attributes.uv;
// const uvArr = uvAttr.array;
//
// function adjustUV(face, repeatX, repeatY) {
//
//     let m = 8;
//     uvArr[face * m] *= repeatX; uvArr[face * m + 1] *= repeatY;
//     uvArr[face * m + 2] *= repeatX; uvArr[face * m + 3] *= repeatY;
//     uvArr[face * m + 4] *= repeatX; uvArr[face * m + 5] *= repeatY;
//     uvArr[face * m + 6] *= repeatX; uvArr[face * m + 7] *= repeatY;
// }
//
// adjustUV(0, width, height); // front
// adjustUV(1, width, height); // back
// adjustUV(2, width, depth);  // top
// adjustUV(3, width, depth);  // bottom
// adjustUV(4, depth, height); // left
// adjustUV(5, depth, height); // right





brick = new THREE.Mesh(currentGeometry, material);
camera.position.z = 5;
brick.rotation.x += 0.5;

// Rotation
function animate() {
    requestAnimationFrame(animate);
    // brick.rotation.x += 0.01;
    brick.rotation.y += 0.01;

    // obj1.rotation.y += .01;

    // brick.rotation.z += 0.02;
    renderer.render(scene, camera);
}
animate();

function changeShape(shape) {
    scene.remove(brick);
    currentGeometry = geometries[shape];
    brick = new THREE.Mesh(currentGeometry, material);
    brick.rotation.x += 0.5;
    scene.add(brick);
}

// GUI Controls
// const gui = new GUI();
// const shapes = ['Box', 'Sphere', 'Cylinder'];
// const params = { shape: 'Box' };
//
// gui.add(params, 'shape', shapes).onChange(value => {
//     scene.remove(brick);
//     currentGeometry = geometries[value];
//     brick = new THREE.Mesh(currentGeometry, material);
//     brick.rotation.x += 0.25 + Math.random();
//     scene.add(brick);
// });
//
// const colors = {
//     Green: 0x00ff00,
//     Red: 0xff0000,
//     Blue: 0x0000ff,
//     Yellow: 0xffff00
// };
//
// const colorFolder = gui.addFolder('Colors');
// colorFolder.add({ color: 'Green' }, 'color', Object.keys(colors)).onChange(color => {
//     material.color.setHex(colors[color]);
// });
// colorFolder.open();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


function changeColor(color) {
    material.color.setHex('0x' + color);
}


document.querySelectorAll('.stone-variant-color-button').forEach(b => {
    b.addEventListener('click', e => {
        // console.log(e.target.getAttribute('data-color'));
        changeColor(e.target.getAttribute('data-color'));
    })
});


document.querySelectorAll('.stone-variant').forEach(b => {
    b.addEventListener('click', e => {
        changeShape(e.target.getAttribute('data-variant'))
    })
});

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
