const mainForm = document.querySelector("#main-form");
const ceIntro = document.querySelector("#ceIntro");
const academicProgram = document.querySelector("#academicPrograms");

getIndexInfo();

async function getIndexInfo(){
    const response = await fetch('/cpe_info');
    const data = await response.json();

    ceIntro.innerText = data['ceIntro'];
    academicProgram.innerText = data['academicPrograms'];
}

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fd = new FormData(mainForm);
    fetch('/cpe_info', {
        method: "POST",
        headers: {
            "CSRF-Token": Cookies.get('XSRF-TOKEN')
        },
        body: fd,
    });
})

