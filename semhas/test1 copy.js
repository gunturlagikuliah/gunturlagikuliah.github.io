import data from './data.json' assert {type: "json"};
console.log(data);
// document.querySelector('#container').innerHTML='\
// sadasd <br> \
// asdasd\
// asdadsads <br>\
// <button></button>\
// // ';
// document.addEventListener("DOMContentLoaded", (event) => {
//     console.log("DOM fully loaded and parsed");
//     document.getElementById('nama').innerHTML = `
//     test<br>
//     <img src='${data.calon[0].logokampanye}' alt='cambar'></img>
//     `;
//     document.querySelectorAll('.nama').forEach(element => {
//         element.innerHTML = `<img src='${data.calon[0].logokampanye}' alt='cambar'></img>
//         `;
//     });
//     console.log('berhasil');
// });
let i = 1;
// LINK
document.getElementById('videoprofil').href=data.calon[i].youtube;
document.getElementById('situsresmi').href=data.calon[i].web;

// VISI MISI
document.getElementById('visi').innerHTML=data.calon[i].visi;
for(let j = 0; j < data.calon[i].misi.length; j++){
    document.getElementById('misi').innerHTML+=`<li>${data.calon[i].misi[j]}</li>`
}

// CALON KEPALA
document.getElementById('nomorkepala').innerHTML=`<b>CALON PRESIDEN RI NO. 0${i+1}</b>`;
document.getElementById('fotocalonkepala').src=data.calon[i].calonkepala.foto;
document.getElementById('namakepala').innerHTML=data.calon[i].calonkepala.nama;
document.getElementById('ttlkepala').innerHTML=`${data.calon[i].calonkepala.tempatlahir}, ${data.calon[i].calonkepala.tanggallahir}`;
document.getElementById('fotopartaikepala').src=data.calon[i].calonkepala.partaiasal.gambarpartai;
for(let j = 0; j < data.calon[i].calonkepala.sorotan.length; j++){
    document.getElementById('sorotankepala').innerHTML+=`<li>${data.calon[i].calonkepala.sorotan[j]}</li>`
}

// CALON WAKIL
document.getElementById('nomorwakil').innerHTML=`<b>CALON WAKIL PRESIDEN RI NO. 0${i+1}</b>`;
document.getElementById('fotocalonwakil').src=data.calon[i].calonwakil.foto;
document.getElementById('namawakil').innerHTML=data.calon[i].calonwakil.nama;
document.getElementById('ttlwakil').innerHTML=`${data.calon[i].calonwakil.tempatlahir}, ${data.calon[i].calonwakil.tanggallahir}`;
document.getElementById('fotopartaiwakil').src=data.calon[i].calonwakil.partaiasal.gambarpartai;
for(let j = 0; j < data.calon[i].calonwakil.sorotan.length; j++){
    document.getElementById('sorotanwakil').innerHTML+=`<li>${data.calon[i].calonwakil.sorotan[j]}</li>`
}

console.log('selesai');