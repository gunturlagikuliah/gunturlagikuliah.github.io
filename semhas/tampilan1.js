import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { mockWithVideo } from './container-mock.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import data from './data.json' assert {type: "json"};

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        // mockWithVideo('./ignore/pasangan1.mp4');
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: data.mindtarget,
            maxTrack: 1,
            filterMinCF: 0.0001,
            filterBeta: 0.001,
        })
        const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

        const anchor = [];
        const pageObject = new CSS3DObject(document.getElementById('plane'))
        for (let i = 0; i < data.calon.length; i++) {
            console.log(i);
            anchor[i] = mindarThree.addCSSAnchor(i);

        }
        for (let i = 0; i < data.calon.length; i++) {
            console.log('loop2')
            console.log(i);
            anchor[i].onTargetFound = () => {
                console.log(`TARGET ${i} FOUND`);
                document.getElementById('namacalonkiri').innerHTML=data.calon[i].calonkepala.nama;
                document.getElementById('namacalonkanan').innerHTML=data.calon[i].calonwakil.nama;
                document.getElementById('poster').src=data.calon[i].poster;
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
