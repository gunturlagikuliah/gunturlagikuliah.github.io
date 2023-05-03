import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { mockWithVideo} from './camera-mock.js';
import {CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js';

const createYoutube = () => {
    return new Promise((resolve, reject) => {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      const onYouTubeIframeAPIReady = () => {
        const player = new YT.Player('player', {
      videoId: 'hLK41oLH8kw',
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

document.addEventListener('DOMContentLoaded', () => {
    const start = async () =>{
        const player = await createYoutube();
        mockWithVideo('./testvideo.mp4');
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './marker/targets.mind',
            maxTrack: 1,
            filterMinCF: 0.0001,
            filterBeta: 0.001,
          })
        //const {renderer, scene, camera} = mindarThree;
        const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

        //const geometry = new THREE.PlaneGeometry(1,1);
        //const material = new THREE.MeshBasicMaterial({color: 0x0000FF, transparent: true, opacity:0.5});
        //const plane = new THREE.Mesh(geometry, material);

    
        const geometry2 = new THREE.PlaneGeometry(1,1);
        const material2 = new THREE.MeshBasicMaterial({color: 0x00FF66, transparent: true, opacity:0.5});
        const plane2 = new THREE.Mesh(geometry2, material2);

        //const anchor = mindarThree.addAnchor(0);
        const anchor2 = mindarThree.addAnchor(1);

        //anchor.group.add(plane); // Ini hirarki grup 3js

        //CSS 3d Objek
        const obj = new CSS3DObject(document.querySelector("#ar"));
        //obj.scale.set(5,5,5);
        //obj.position.set(0,-1500,0);
        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(obj);

        anchor2.group.add(plane2);

        var vidyt = document.getElementById("ytv");
        cssAnchor.onTargetFound = () =>{
            console.log("CSS TARGET FOUND");
            player.playVideo();
        }
        cssAnchor.onTargetLost = () =>{
            console.log("CSS TARGET LOST");
            //document.getElementById("ytvideo").contentWindow.player.pause();
            player.pauseVideo();
        }

        anchor2.onTargetFound = () =>{
            console.log("TARGET 2 FOUND");
        }
        anchor2.onTargetLost = () =>{
            console.log("TARGET 2 LOST");
        }

        await mindarThree.start()
        renderer.setAnimationLoop(()=>{
            cssRenderer.render(cssScene,camera);
            renderer.render(scene, camera);
        });

        // await mindarThree.start()
        // renderer.setAnimationLoop(()=>{
        //     renderer.render(scene,camera);
        // });
    }
    start();
    
});
