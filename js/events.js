import * as THREE from 'three';


export const windowResize = (showcase) => () => {
    // showcase.camera.aspect = window.innerWidth / window.innerHeight;
    showcase.camera.aspect = showcase.container.offsetWidth / showcase.container.offsetHeight;
    showcase.camera.updateProjectionMatrix();
    // showcase.renderer.setSize(window.innerWidth, window.innerHeight);
    showcase.renderer.setSize(showcase.container.offsetWidth, showcase.container.offsetHeight);
}
