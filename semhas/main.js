import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { mockWithVideo } from './container-mock.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import data from './data.json' assert {type: "json"};

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        // mockWithVideo('./testvideo.mp4');
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: data.mindtarget,
            maxTrack: 1,
            filterMinCF: 0.0001,
            filterBeta: 0.001,
        })
        const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

        const anchor = [];
        const pageObject = new CSS3DObject(document.getElementById('container'))
        for (let i = 0; i < data.calon.length; i++) {
            console.log(i);
            anchor[i] = mindarThree.addCSSAnchor(i);

        }
        for (let i = 0; i < data.calon.length; i++) {
            console.log('loop2')
            console.log(i);
            anchor[i].onTargetFound = () => {
                console.log(`TARGET ${i} FOUND`);
                document.getElementById('container').innerHTML=`
                <div style="font-size: 80px; color: red;">${data.calon[i].calonkepala.nama}</div>
                `
                anchor[i].group.add(pageObject);
            }
            anchor[i].onTargetLost = () => {
                console.log(`TARGET ${i} LOST`);
            }
        }

        await mindarThree.start()
        renderer.setAnimationLoop(() => {
            cssRenderer.render(cssScene, camera);
            renderer.render(scene, camera);
        });
    }
    start();

});
