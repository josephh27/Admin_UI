const cpeIntro = document.querySelector("#ceIntro");
const academicProgram = document.querySelector("#academicPrograms");
const cpeLogo = document.querySelector("#cpe-logo");

async function getInfo(){
    const response = await fetch('/cpe_info');
    const data = await response.json();

    cpeIntro.innerText = data['ceIntro'];
    academicProgram.innerText = data['academicPrograms'];
    cpeLogo.src = 'cpe'
}


getInfo();