const ceIntro = document.querySelector("#ceIntro");
const academicProgram = document.querySelector("#academicPrograms");

getIndexInfo();

async function getIndexInfo(){
    const response = await fetch('/indexInfo');
    const data = await response.json();

    ceIntro.innerText = data['ceIntro'];
    academicProgram.innerText = data['academicPrograms'];
}