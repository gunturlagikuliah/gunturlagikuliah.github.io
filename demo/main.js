import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { mockWithVideo} from './camera-mock.js';

document.addEventListener('DOMContentLoaded', () => {
    const start = async () =>{
        mockWithVideo('./testvideo.mp4');
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './marker/targets.mind',
          })
        const {renderer, scene, camera} = mindarThree;
        const geometry = new THREE.PlaneGeometry(1,1);
        const material = new THREE.MeshBasicMaterial({color: 0x0000FF, transparent: true, opacity:0.5});
        const plane = new THREE.Mesh(geometry, material);
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane); // Ini hirarki grup 3js
        await mindarThree.start()
        renderer.setAnimationLoop(()=>{
            renderer.render(scene,camera);
        });
    }
    start();
    
});
