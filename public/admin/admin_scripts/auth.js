import { auth } from './firebase.js';
import { setPersistence, signInWithEmailAndPassword, inMemoryPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { setupUI } from './admin.js';

window.addEventListener("DOMContentLoaded", () => {

// Login for security purposes
setPersistence(auth, inMemoryPersistence);

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.querySelector("#login-email").value;
    const password = e.target.querySelector("#login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            // Close the login modal and reset the form
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close()
            loginForm.reset();
            return user.getIdToken().then((idToken) => {
                return fetch("/session_login", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "CSRF-Token": Cookies.get('XSRF-TOKEN')
                    },
                    body: JSON.stringify({ idToken }),
                });
            })
        })
        .catch((err) => {
            alert(err.message);
        })
        
        .then(() => {
            window.location.assign("/admin/cpe");
        })
        return false;
    });

// Listen for auth status changes
onAuthStateChanged(auth, async (user) => {
    user = await fetch('/session_login');
    let userData = await user.json();
    if ((Object.keys(userData)).length) {
        setupUI(userData);
    } else {
        setupUI();
    }
})
})