const mainForm = document.querySelector("#main-form");
const ceIntro = document.querySelector("#ceIntro");
const academicProgram = document.querySelector("#academicPrograms");

getIndexInfo();

async function getIndexInfo(){
    const response = await fetch('/indexInfo');
    const data = await response.json();

    ceIntro.innerText = data['ceIntro'];
    academicProgram.innerText = data['academicPrograms'];
}

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fd = new FormData(mainForm);
    const urlEncoded = new URLSearchParams(fd).toString();
    fetch('/indexInfo', {
        method: "POST",
        body: fd,
    });
})


// UI stuff
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

export const setupUI = (user) => {
    if (user) { 
        console.log('logged in.')
        
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}


// Setup materialize components
document.addEventListener('DOMContentLoaded', () => {
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})
