import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

document.addEventListener('DOMContentLoaded', () => {
    const start = async () =>{
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './marker/pasangan1.mind',
          })
        const {renderer, scene, camera} = mindarThree;
        const geometry = new THREE.PlaneGeometry(1,1);
        const material = new THREE.MeshBasicMaterial({color: 0x0000FF, transparent: true, opacity:0.5});
        const plane = new THREE.Mesh(geometry, material);
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane); // Ini hirarki grup 3js
        mindarThree.start()
        renderer.setAnimaitionLoop(()=>{
            renderer.render(camera,scene);
        });
    }
    start();
    
});
