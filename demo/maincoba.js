import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { mockWithVideo } from './container-mock.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        mockWithVideo('./calon1.mp4');

        //Deklarasi objek mind AR di tempat container, marker targets.mind, dan ketentuan setting
        const mindarThree = new MindARThree({
            container: document.querySelector("body"),
            imageTargetSrc: './marker/targets.mind',
            maxTrack: 1,
            filterMinCF: 0.0001,
            filterBeta: 0.001,
        })


        //Deklarasi renderer dan scene untuk mindar
        const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

        // NAVIGASI ATAS----
        const navigasiatas = new CSS3DObject(document.querySelector("#navigasiatas"));  //Membuat CCS 3D OBJECT dalam html dengan id
        navigasiatas.scale.set(1,1,1);
        //obj.position.set(0,-1500,0);
        const navigasiAtasAnchor = mindarThree.addCSSAnchor(0);
        const navigasiAtasAnchor2 = mindarThree.addCSSAnchor(1);




        //NAVIGASI BAWAH----

        //TENGAH

        //CALON KIRI----

        //CALON KANAN---

        //Debug target found
        //Anchor 1
        navigasiAtasAnchor.onTargetFound = () => {
            console.log("CSS TARGET FOUND");
            document.querySelector('#isinavigasiatas').innerHTML="NARUTO";
            navigasiAtasAnchor.group.add(navigasiatas);
            
        }
        navigasiAtasAnchor.onTargetLost = () => {
            console.log("CSS TARGET LOST");
        }

        //Anchor 2
        navigasiAtasAnchor2.onTargetFound = () => {
            console.log("CSS 2 TARGET FOUND");
            document.querySelector('#isinavigasiatas').innerHTML="SASUKE";
            navigasiAtasAnchor2.group.add(navigasiatas);

        }
        navigasiAtasAnchor2.onTargetLost = () => {
            console.log("CSS 2 TARGET LOST");
        }

       


        //Perintah render object mindAR dengan ketentuan renderer dan kamera mana yang digunakan
        await mindarThree.start()
        renderer.setAnimationLoop(() => {
            cssRenderer.render(cssScene, camera);
            renderer.render(scene, camera);
        });

    }
    start();

});
