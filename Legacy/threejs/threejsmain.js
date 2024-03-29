import * as THREE from './three.module.js';
//console.log('THREE',THREE);
document.addEventListener("DOMContentLoaded", () => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1 ,1 ,1);
    const material = new THREE.MeshBasicMaterial({color: "#FFA07A"});
    const cube = new THREE.Mesh(geometry, material);
   // const a = new THREE.Object3D;
   // a.postion

    //console.log(cube.isObject3D);

    
    //scene.children[0].position.set(0,0,-2);
   // scene.children[0].rotation.set(0, Math.pi/4, 0);
   
    cube.position.set(0, 0, -2);
    cube.rotation.set(0, Math.PI/4, 0);
    scene.add(cube);

    const camera = new THREE.PerspectiveCamera();
    camera.position.set(1, 1, 5);
    
    const renderer = new THREE.WebGLRenderer({aplha: true});
    renderer.setSize(500, 500);
    renderer.render(scene, camera);

    const video = document.createElement("video");
    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
        video.srcObject = stream;
        video.play();
    });

    video.style.position = "absolute";
    video.style.width = renderer.domElement.width;
    video.style.height = renderer.domElement.height;
    renderer.domElement.style.position = "absolute";
    
    document.body.appendChild(video);
    document.body.appendChild(renderer.domElement);
    console.log("dom");
}
);