import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { mockWithVideo } from './container-mock.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

//Method untuk player youtube
const createYoutube = () => {
    return new Promise((resolve, reject) => {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      const onYouTubeIframeAPIReady = () => {
        const player = new YT.Player('player', {
      videoId: '',
      height: '1080',
      width: '1920',
      playerVars: { 'controls': 0 },
      events: {
        onReady: () => {
          resolve(player);
        }
      }
        });
      }
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    });
  }

//Main Program
document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        const player = await createYoutube();
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

        // LOKASI DAN NAVIGASI ATAS----
        const navigasiatas = new CSS3DObject(document.querySelector("#navigasiatas"));  //Membuat CCS 3D OBJECT dalam html dengan id
        navigasiatas.scale.set(1, 1, 1);
        navigasiatas.position.set(0, 450, 0);
        const anchorMarker1 = mindarThree.addCSSAnchor(0);
        const anchorMarker2 = mindarThree.addCSSAnchor(1);

        //TENGAH----

        const tengah = new CSS3DObject(document.querySelector("#tengah"));  //Membuat CCS 3D OBJECT dalam html dengan id
        //tengah.scale.set(1.07,1.07,1.07);
        tengah.scale.set(1.33, 1.33, 1.33);
        tengah.position.set(0, 0, 0);

        
        //NAVIGASI BAWAH----
        const bawah = new CSS3DObject(document.querySelector("#navigasibawah"));
        //bawah.position.set(0,-1600,0)

        //CALON KIRI----
        const calonKiri = new CSS3DObject(document.querySelector("#calonkiri"));
        calonKiri.position.set(-1000,450,0)

        //CALON KANAN---

        //Debug target found
        //Anchor 1
        anchorMarker1.onTargetFound = () => {
            console.log("CSS TARGET FOUND");
            document.querySelector('#isinavigasiatas').innerHTML = "NARUTO";
            anchorMarker1.group.add(navigasiatas);
            anchorMarker1.group.add(tengah);
            anchorMarker1.group.add(calonKiri);
            anchorMarker1.group.add(bawah)

        }
        anchorMarker1.onTargetLost = () => {
            console.log("CSS TARGET LOST");
        }

        //Anchor 2
        anchorMarker2.onTargetFound = () => {
            console.log("CSS 2 TARGET FOUND");
            document.querySelector('#isinavigasiatas').innerHTML = "SASUKE";
            anchorMarker2.group.add(navigasiatas);

        }
        anchorMarker2.onTargetLost = () => {
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
