mainForm = document.querySelector("#main-form");
const ceIntro = document.querySelector("#ceIntro");
const academicProgram = document.querySelector("#academicPrograms");

getIndexInfo();

async function getIndexInfo(){
    const response = await fetch('/indexInfo');
    const data = await response.json();

    ceIntro.innerText = data['ceIntro'];
    academicProgram.innerText = data['academicPrograms'];
}

mainForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/indexInfo');
    const data = await response.json();
    
    const fd = new FormData(mainForm);
    const urlEncoded = new URLSearchParams(fd).toString();
    fetch('/indexInfo', {
        method: 'POST',
        body: urlEncoded,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });


})
