import { MindARThree } from 'mindar-image-three';
import { mockWithVideo } from './container-mock.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import data from './data.json' assert {type: "json"};

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        // mockWithVideo('./semhas/ignore/pasangan0.mp4');
        // mockWithVideo('./demo/calon2.mp4');
        const mindarThree = new MindARThree({
            container: document.body,
            uiScanning: '#scanning',
            imageTargetSrc: data.mindtarget,
            maxTrack: 1,
            filterMinCF: 0.0001,
            filterBeta: 0.001,
        })
        const { renderer, cssRenderer, cssScene, camera } = mindarThree;

        const anchor = [];
        const pageObject = new CSS3DObject(document.getElementById('plane'));
        pageObject.position.set(0,1000,0);

        for (let i = 0; i < data.calon.length; i++) {
            anchor[i] = mindarThree.addCSSAnchor(i);

        }
        for (let i = 0; i < data.calon.length; i++) {
            anchor[i].onTargetFound = () => {
                console.log(`TARGET ${i} FOUND`);
                //DATA
                let dataCalon = data.calon[i];

                //Menu
                document.getElementById('navigasi').style.display="block";

                //LOGO
                document.getElementById('logocalon').src=dataCalon.logokampanye;
                document.getElementById('iconlogo').src=dataCalon.logokampanye;

                // LINK
                document.getElementById('youtube').src=`https://www.youtube.com/embed/${dataCalon.youtube.slice(32)}?enablejsapi=1`;
                document.getElementById('situsresmi').href = dataCalon.web;

                // VISI MISI
                document.getElementById('visi').innerHTML = dataCalon.visi;
                document.getElementById('misi').innerHTML ='';
                for (let j = 0; j < dataCalon.misi.length; j++) {
                    document.getElementById('misi').innerHTML += `<li>${dataCalon.misi[j]}</li>`
                }

                // CALON KEPALA
                document.getElementById('nomorkepala').innerHTML = `<b>CALON PRESIDEN RI NO. 0${i + 1}</b>`;
                document.getElementById('fotocalonkepala').src = dataCalon.calonkepala.foto;
                document.getElementById('namakepala').innerHTML = dataCalon.calonkepala.nama;
                document.getElementById('ttlkepala').innerHTML = `${dataCalon.calonkepala.tempatlahir}, ${dataCalon.calonkepala.tanggallahir}`;
                document.getElementById('fotopartaikepala').src = dataCalon.calonkepala.partaiasal.gambarpartai;
                document.getElementById('sorotankepala').innerHTML='';
                for (let j = 0; j < dataCalon.calonkepala.sorotan.length; j++) {
                    document.getElementById('sorotankepala').innerHTML += `<li>${dataCalon.calonkepala.sorotan[j]}</li>`
                }

                // CALON WAKIL
                document.getElementById('nomorwakil').innerHTML = `<b>CALON WAKIL PRESIDEN RI NO. 0${i + 1}</b>`;
                document.getElementById('fotocalonwakil').src = dataCalon.calonwakil.foto;
                document.getElementById('namawakil').innerHTML = dataCalon.calonwakil.nama;
                document.getElementById('ttlwakil').innerHTML = `${dataCalon.calonwakil.tempatlahir}, ${dataCalon.calonwakil.tanggallahir}`;
                document.getElementById('fotopartaiwakil').src = dataCalon.calonwakil.partaiasal.gambarpartai;
                document.getElementById('sorotanwakil').innerHTML='';
                for (let j = 0; j < dataCalon.calonwakil.sorotan.length; j++) {
                    document.getElementById('sorotanwakil').innerHTML += `<li>${dataCalon.calonwakil.sorotan[j]}</li>`
                }

                anchor[i].group.add(pageObject);
            }
            anchor[i].onTargetLost = () => {
                console.log(`TARGET ${i} LOST`);
            }
        }

        await mindarThree.start()
        renderer.setAnimationLoop(() => {
            cssRenderer.render(cssScene, camera);
        });
    }
    start();

});
