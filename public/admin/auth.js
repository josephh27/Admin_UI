import { auth } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { setupUI } from './admin.js';

// Listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        setupUI(user);
    } else {
        setupUI();
    }
})


// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password).then((cred) => {
        // Close the login modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close()
        loginForm.reset();
    }).catch((err) => {
        alert(err.message);
    })
})

