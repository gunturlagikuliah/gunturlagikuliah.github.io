import { MindARThree } from 'mindar-image-three';
// import { mockWithVideo } from './container-mock.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
// import data from './data.json' assert {type: "json"};
// Data Embed
const data = {
    "mindtarget": "./marker/gubtargets.mind",
    "calon": [
        {
            "visi": "JAKARTA sebagai etalase kota Indonesia yang modern, tertata rapi, manusiawi, dan fokus pada pembangunan manusia seutuhnya  dengan kepemimpinan yang bersih , transparan, dan profesional.",
            "misi": [
                "Mewujudkan pemerintahan yang bebas korupsi, kolusi, dan nepotisme (KKN), terbuka, dan melayani warga.",
                "Menjamin terpenuhinya kebutuhan dasar warga, yaitu jaminan kesehatan, jaminan pendidikan, hunian yang layak, bahan pangan yang terjangkau, transportasi publik yang ekonomis, dan lapangan pekerjaan serta usaha agar seluruh warga berkesempatan memperoleh kehidupan yang lebih baik sehingga Indeks Kebahagiaan kota Jakarta menjadi salah satu yang tertinggi di antara kota-kota di dunia.",
                "Menciptakan sumber daya manusia yang tangguh lahir dan batin, kompeten, dan berdaya saing global dengan Indeks Pembangunan Manusia yang setara dengan kota-kota maju di dunia.",
                "Menata kota sesuai perubahan zaman untuk mendukung kemajuan ekonomi, keberlangsungan lingkungan, dan kehidupan sosial budaya warga.",
                "Membangun kehidupan kota yang berbasis teknologi dan berinfrastruktur kelas dunia dengan warga yang berketuhanan, berbudaya, bergotong royong, berwawasan, toleran, partisipatif, dan inovatif."
            ],
            "youtube": "https://www.youtube.com/watch?v=mkDqU6xLODI",
            "web": "https://ahok.org/tentang-ahok/visi-misi-program-kerja-ahok-djarot/",
            "logokampanye": "./resources/webp/logocalongub1.webp",
            "calonkepala": {
                "nama": "Ir. Basuki Tjahaja Purnama, M.M.",
                "foto": "./resources/webp/foto/ahok.webp",
                "tanggallahir": "29 Juni 1966",
                "tempatlahir": "Manggar",
                "partaiasal": {
                    "namapartai": "Independen",
                    "gambarpartai": "./resources/webp/partai/independen.webp"
                },
                "sorotan": [
                    "Gubernur Jakarta (2014-2017)",
                    "DPR RI (2009-2014)",
                    "DPRD Belitung (2004-2009)"
                ]
            },
            "calonwakil": {
                "nama": "Drs. H. Djarot Saiful Hidayat, M.S.",
                "foto": "./resources/webp/foto/djarot.webp",
                "tanggallahir": "06 Juli 1962",
                "tempatlahir": "Magelang",
                "partaiasal": {
                    "namapartai": "PDIP",
                    "gambarpartai": "./resources/webp/partai/pdip.webp"
                },
                "sorotan": [
                    "Wakil Gubernur Jakarta (2014-2017) ",
                    "DPR RI (2010-2014) ",
                    "Walikota Blitar (2000-2010)"
                ]
            }
        },
        {
            "visi": "Jakarta kota maju, lestari dan berbudaya yang warganya terlibat dalam mewujudkan keberadaban, keadilan, dan kesejahteraan bagi semua",
            "misi": [
                "Menjadikan Jakarta kota aman, sehat, cerdas, berbudaya, dengan memperkuat nilai-nilai keluarga dan memeberikan ruang kreativitas melalui kepemimpinan yang melibatkan, menggerakan dan memanusiakan. ",
                "Menjadikan Jakarta kota memajukan kesejahteraan umum melalui terciptanya lapangan kerja, kestabilan dan keterjangkauan kebutuhan pokok, meningkatnya keadilan sosial, percepatan pembangunan infrastruktur, kemudahan investasi dan berbisnis, serta perbaikan pengolaan tata ruang.",
                "Menjadikan Jakarta tempat wahana aparatur negara yang berkarya , mengabdi dan melayani, serta menyelesaikan berbagai permasalahan kota dan warga, secara efektif, meritokratis, dan berintergritas.",
                "Menjadikan Jakarta kota yang lestari, dengan pembangunan dan tata kehidupan yang memperkuat daya dukung lingkungan dan sosial.",
                "Menjadikan Jakarta ibu kota yang dinamis sebagai simpul kemajuan Indonesia yang bercirikan keadilan, kebangsaan dan kebhinekaan."

            ],
            "youtube": "https://www.youtube.com/watch?v=fqnrC3Wjauk",
            "web": "https://jakartamajubersama.com/",
            "logokampanye": "./resources/webp/logocalongub2.webp",
            "calonkepala": {
                "nama": "Anies Rasyid Baswedan, Ph.D.",
                "foto": "./resources/webp/foto/anies.webp",
                "tanggallahir": "07 Mei 1969",
                "tempatlahir": "Kuningan",
                "partaiasal": {
                    "namapartai": "Independen",
                    "gambarpartai": "./resources/webp/partai/independen.webp"
                },
                "sorotan": [
                    "Pendiri dan ketua yayasan Indonesia Mengajar (2010)",
                    "Menteri pendidikan dan kebudayaan RI (2014-2016)",
                    "Rektor Universitas Paramadina (2007-2014)"
                ]
            },
            "calonwakil": {
                "nama": "Sandiaga Salahuddin Uno, MBA",
                "foto": "./resources/webp/foto/sandi.webp",
                "tanggallahir": "28 Juni 1969",
                "tempatlahir": "Pekanbaru",
                "partaiasal": {
                    "namapartai": "Gerindra",
                    "gambarpartai": "./resources/webp/partai/gerindra.webp"
                },
                "sorotan": [
                    "Mendirikan PT Recapital Advisors (1997)",
                    "Mendirikan PT Saratoga Investama Sedaya (1998)",
                    "Penghargaan - Indonesian Entrepreneur of the Year (2008)"
                ]
            }
        }
    ]
}

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
                document.getElementById('nomorkepala').innerHTML = `<b>CALON GUBERNUR DKI NO. 0${i + 2}</b>`;
                document.getElementById('fotocalonkepala').src = dataCalon.calonkepala.foto;
                document.getElementById('namakepala').innerHTML = dataCalon.calonkepala.nama;
                document.getElementById('ttlkepala').innerHTML = `${dataCalon.calonkepala.tempatlahir}, ${dataCalon.calonkepala.tanggallahir}`;
                document.getElementById('fotopartaikepala').src = dataCalon.calonkepala.partaiasal.gambarpartai;
                document.getElementById('sorotankepala').innerHTML='';
                for (let j = 0; j < dataCalon.calonkepala.sorotan.length; j++) {
                    document.getElementById('sorotankepala').innerHTML += `<li>${dataCalon.calonkepala.sorotan[j]}</li>`
                }

                // CALON WAKIL
                document.getElementById('nomorwakil').innerHTML = `<b>CALON WAKIL GUBERNUR DKI NO. 0${i + 2}</b>`;
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
