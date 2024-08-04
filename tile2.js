// import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
// import { GUI } from 'https://cdn.skypack.dev/lil-gui@0.17.0';
// import { OBJLoader } from 'https://cdn.skypack.dev/three@0.152.2/three/addons/loaders/OBJLoader.js'

import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { setupRenderer, setupControls, setupLights } from './js/scene.js';
import { windowResize } from "./js/events.js";


const showcase = {
    container: document.getElementById('rotating-stone'),
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: setupRenderer(),
    orbitControlsContainer: document.getElementById("orbit-controls")
}

showcase.controls = setupControls(showcase);
setupLights(showcase);
showcase.container.appendChild(showcase.renderer.domElement);



const textureLoader = new THREE.TextureLoader();

let materials = [

];

// const textureName = 'rock_wall_03' ;
// const textureName = 'brushed_concrete_2' ;
const textureName = 'gravel_embedded_concrete' ;
const textureNameSuffix = '_1k';

let brick;


function createMaterial(textureName, textureNameSuffix, textureZoom, color, diffuseSuffix) {

    if (typeof diffuseSuffix === 'undefined') {
        diffuseSuffix = '';
    }

    const diffuseTexture = textureLoader.load(`textures/${textureName}_diff${textureNameSuffix}${diffuseSuffix}.jpg`,
        texture => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(textureZoom, textureZoom);
            showcase.scene.add(brick);
        }); // Replace with your Diffuse texture URL

    const normalTexture = textureLoader.load(`textures/${textureName}_nor_gl${textureNameSuffix}.jpg`, texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(textureZoom, textureZoom);
    }); // Replace with your Normal texture URL

    const armTexture = textureLoader.load(`textures/${textureName}_arm${textureNameSuffix}.jpg`, texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(textureZoom, textureZoom);
    }); // Replace with your AO texture URL

    const material = new THREE.MeshStandardMaterial({
        map: diffuseTexture,
        normalMap: normalTexture,
        aoMap: armTexture,
        roughnessMap: armTexture,
        metalnessMap: armTexture,
        //displacementMap: displacementTexture,
        // displacementScale: 0.01
    });

    if (color) {
        material.color.setHex('0x' + color);
    }

    return material;
}

// let material = createMaterial('gravel_embedded_concrete', '_1k', 5.5, null, '_m1');
let material = createMaterial('gravel_embedded_concrete', '_1k', 5.5, 'f0eee6');

materials[1] = material;
materials[2] = createMaterial('gravel_embedded_concrete', '_1k', 6, null, '_m2');
materials[3] = createMaterial('gravel_embedded_concrete', '_1k', 3.5, null, '_m3');
materials[4] = createMaterial('gravel_embedded_concrete', '_1k', 3.5, 'b8a298', '_m4');
materials[5] = createMaterial('gravel_embedded_concrete', '_1k', 3.5, 'dbc9b6', '_m4');
materials[6] = createMaterial('gravel_embedded_concrete', '_1k', 4.5, 'd9c3a7');


let obj1;



const width = 2.25, height = .25, depth = 3.25;




// Brick Geometry
const geometries = {
    Box: new THREE.BoxGeometry(width, height, depth),
    Sphere: new THREE.SphereGeometry(0.75, 32, 32),
    Cylinder: new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
    cube1: null
};



// transformControls = new TransformControls(camera, renderer.domElement);
// transformControls.attach(geometries.Box);
// scene.add(transformControls);



const objLoader = new OBJLoader();

objLoader.load(
    // resource URL
    'objects/vika31.obj',
    // called when resource is loaded
    function ( object ) {

        console.log('loaded', object);
        console.log('geom', geometries);
        geometries.cube1 = object.children[0];
        console.log('geom', geometries);

        changeShape('cube1')

        // scene.add( object );
        // obj1 = object.children[0];

        // transformControls = new TransformControls(camera, renderer.domElement);
        // transformControls.attach(geometries.cube1);
        // scene.add(transformControls);

        // Optionally, add controls for toggling transform mode
        // transformControls.addEventListener('change', render);

    },
    // called when loading is in progresses
    function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
    // called when loading has errors
    function ( error ) { console.log( 'An error happened' ); }
);

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



let minimapCamera;

brick = new THREE.Mesh(currentGeometry, material);
showcase.camera.position.z = 5;
brick.rotation.x += 0.5;

// Rotation
function animate() {
    requestAnimationFrame(animate);
    // brick.rotation.x += 0.01;

    if ( document.getElementById('enable-rotation').checked ) {
        brick.rotation.y += 0.01;
    }


    showcase.controls.update();
    // if (transformControls)
    //     transformControls.update();

    // // obj1.rotation.y += .01;
    // miniMapCamera.position.copy(camera.position); // Sync mini-map camera with main camera position
    // miniMapCamera.rotation.copy(camera.rotation); // Sync mini-map camera with main camera rotation
    // miniMapRenderer.render(miniMapScene, miniMapCamera);

    // brick.rotation.z += 0.02;
    showcase.renderer.render(showcase.scene, showcase.camera);
}
animate();

function changeShape(shape) {
    console.log('change shape to ', shape);
    showcase.scene.remove(brick);

    if (shape == 'cube1') {
        // currentGeometry = geometries[shape];
        brick = geometries['cube1']; // new THREE.Mesh(currentGeometry, material);

        brick.traverse(function(child) {
            if (child.isMesh) {
                child.material = material;
            }
        });
        brick.rotation.x += 0.5;
        showcase.scene.add(brick);
    } else {
        currentGeometry = geometries[shape];
        brick = new THREE.Mesh(currentGeometry, material);
        brick.rotation.x += 0.5;
        showcase.scene.add(brick);
    }
}


function changeMaterial(materialIndex) {
    console.log('material', materialIndex);
    material = materials[materialIndex];
    console.log(material);
    brick.material = material;
}





// Handle window resize
window.addEventListener('resize', windowResize(showcase));


function changeColor(color) {
    material.color.setHex('0x' + color);
}





// document.querySelectorAll('.stone-variant-color-button').forEach(b => {
//     b.addEventListener('click', e => {
//         // console.log(e.target.getAttribute('data-color'));
//         changeColor(e.target.getAttribute('data-color'));
//     })
// });


document.querySelectorAll('.stone-variant-color-button').forEach(b => {
    b.addEventListener('click', e => {
        // console.log(e.target.getAttribute('data-color'));
        console.log(e.target.getAttribute('data-material'));
        changeMaterial(e.target.getAttribute('data-material'));
    })
});


document.querySelectorAll('.stone-variant').forEach(b => {
    b.addEventListener('click', e => {
        changeShape(e.target.getAttribute('data-variant'))
    })
});


windowResize(showcase)();

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
