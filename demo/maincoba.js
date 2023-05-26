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

  function onPlayerReady(event) {
    // Add a custom play/pause button
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
        if (player.getPlayerState() == YT.PlayerState.PLAYING) {
            player.pauseVideo();
            playButton.innerHTML = "Play";
        } else {
            player.playVideo();
            playButton.innerHTML = "Pause";
        }
    });
}

function playyt(){
  document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

function pauseyt(){
  document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}
  
document.getElementById("tombolplay").addEventListener("click", function(){
	document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  console.log('tombol play');
});

document.getElementById("tombolpause").addEventListener("click", function(){
  document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
});
//Main Program
document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        const player = await createYoutube();
         mockWithVideo('./static3.mp4');

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
        console.log(cssRenderer.getSize());
        // cssRenderer.setSize(1000,1000);
        console.log(cssRenderer.getSize());

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
         bawah.position.set(0,-1300,0);

        //CALON KIRI----
        const calonKiri = new CSS3DObject(document.querySelector("#calonkiri"));
        calonKiri.position.set(-1000,450,0);

        //CALON KANAN---
        const calonKanan = new CSS3DObject(document.querySelector("#calonkanan"));
        calonKanan.position.set(1000,450,0);

        //Debug target found
        //Anchor 1
        anchorMarker1.onTargetFound = () => {
            console.log("CSS TARGET FOUND");
            document.querySelector('#isinavigasiatas').innerHTML = "NARUTO";
            anchorMarker1.group.add(navigasiatas);
            anchorMarker1.group.add(tengah);
            anchorMarker1.group.add(calonKiri);
            anchorMarker1.group.add(calonKanan);
            anchorMarker1.group.add(bawah)
            // cssRenderer.setSize(1000,1000);
            //player.cueVideoById('BUSfBdyF0QE');
            console.log(player.getVideoUrl());
            // player.cueVideoById('-n84EMKIXQM');
            setTimeout(() => {
              player.cueVideoById('-n84EMKIXQM');
              console.log("test");
              console.log(player.getVideoUrl());
            }, 2000);
            // console.log(cssRenderer.getSize());
            // setTimeout(() => {
            //   player.playVideo();
            // }, 4000);


        }
        anchorMarker1.onTargetLost = () => {
          // document.querySelector('#animasibawah').classList.add('animate__fadeOutDown');
            console.log("CSS TARGET LOST");
        }

        //Anchor 2
        anchorMarker2.onTargetFound = () => {
            console.log("CSS 2 TARGET FOUND");
            document.querySelector('#isinavigasiatas').innerHTML = "SASUKE";
            anchorMarker2.group.add(navigasiatas);
            document.getElementById('kontenoverlay').style.display='block';

        }
        anchorMarker2.onTargetLost = () => {
          document.getElementById('kontenoverlay').style.display='none';
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
