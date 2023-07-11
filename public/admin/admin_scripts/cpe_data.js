const mainForm = document.querySelector("#cpe-main-form");
const cpeLogoInput = document.querySelector("#cpe-logo-input")
const ceIntro = document.querySelector("#ceIntro");
const academicProgram = document.querySelector("#academicPrograms");

getIndexInfo();


// Filling up the current values in the form based on the json file
async function getIndexInfo(){
    const response = await fetch('/cpe_info');
    const data = await response.json();

    ceIntro.innerText = data['ceIntro'];
    academicProgram.innerText = data['academicPrograms'];
}

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(mainForm);
    fd.set('cpeLogo', '../img/' + (cpeLogoInput.value).split("\\").pop())
    fetch('/cpe_info', {
        method: "POST",
        headers: {
            "CSRF-Token": Cookies.get('XSRF-TOKEN')
        },
        body: fd,
    });
})

