alert("login.js loaded");
import {
    auth,
    signInWithEmailAndPassword
} from "./firebase.js";

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {

            await signInWithEmailAndPassword(auth, email, password);

            alert("Login successful!");

            window.location.href = "dashboard.html";

        } catch (error) {

            alert(error.message);

        }

    });

}
