import * as THREE from './three.module.js';
console.log('THREE',THREE);
document.addEventListener("DOMContentLoaded", () => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1 ,1 ,1);
    const material = new THREE.MeshBasicMaterial({color: "#0000FF"});
    const cube = new THREE.Mesh(geometry, material);

    console.log(cube.isObject3D);

    scene.add(cube);
    cube.postion.set(1,1,5);
    cube.rotation.set(0, Math.pi/4, 0);
    
    const camera = new THREE.PerspectiveCamera();
    camera.postion.set(1, 1, 5);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    renderer.render(scene, camera);
    
    console.log("dom");
}
);