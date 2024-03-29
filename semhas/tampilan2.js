import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { mockWithVideo } from './container-mock.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import data from './data.json' assert {type: "json"};

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        // mockWithVideo('./ignore/pasangan2.mp4');
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
                // LINK
                // document.getElementById('videoprofil').href = data.calon[i].youtube;
                console.log(data.calon[i].youtube.slice(32));
                document.getElementById('youtube').src=`https://www.youtube.com/embed/${data.calon[i].youtube.slice(32)}`;
                document.getElementById('situsresmi').href = data.calon[i].web;

                //LOGO CALON
                document.getElementById('logocalon').src = data.calon[i].logokampanye;

                // // VISI MISI
                document.getElementById('visi').innerHTML = data.calon[i].visi;
                document.getElementById('misi').innerHTML ='';
                for (let j = 0; j < data.calon[i].misi.length; j++) {
                    document.getElementById('misi').innerHTML += `<li>${data.calon[i].misi[j]}</li>`
                }

                // // CALON KEPALA
                document.getElementById('nomorkepala').innerHTML = `<b>CALON PRESIDEN RI NO. 0${i + 1}</b>`;
                document.getElementById('fotocalonkepala').src = data.calon[i].calonkepala.foto;
                document.getElementById('namakepala').innerHTML = data.calon[i].calonkepala.nama;
                document.getElementById('ttlkepala').innerHTML = `${data.calon[i].calonkepala.tempatlahir}, ${data.calon[i].calonkepala.tanggallahir}`;
                document.getElementById('fotopartaikepala').src = data.calon[i].calonkepala.partaiasal.gambarpartai;
                document.getElementById('sorotankepala').innerHTML='';
                for (let j = 0; j < data.calon[i].calonkepala.sorotan.length; j++) {
                    document.getElementById('sorotankepala').innerHTML += `<li>${data.calon[i].calonkepala.sorotan[j]}</li>`
                }

                // // CALON WAKIL
                document.getElementById('nomorwakil').innerHTML = `<b>CALON WAKIL PRESIDEN RI NO. 0${i + 1}</b>`;
                document.getElementById('fotocalonwakil').src = data.calon[i].calonwakil.foto;
                document.getElementById('namawakil').innerHTML = data.calon[i].calonwakil.nama;
                document.getElementById('ttlwakil').innerHTML = `${data.calon[i].calonwakil.tempatlahir}, ${data.calon[i].calonwakil.tanggallahir}`;
                document.getElementById('fotopartaiwakil').src = data.calon[i].calonwakil.partaiasal.gambarpartai;
                document.getElementById('sorotanwakil').innerHTML='';
                for (let j = 0; j < data.calon[i].calonwakil.sorotan.length; j++) {
                    document.getElementById('sorotanwakil').innerHTML += `<li>${data.calon[i].calonwakil.sorotan[j]}</li>`
                }
                document.getElementById('overlay').style.display='block';
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
