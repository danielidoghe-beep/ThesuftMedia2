import {
    auth,
    createUserWithEmailAndPassword
} from "./firebase.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    try {

        await createUserWithEmailAndPassword(auth, email, password);

        alert("Account created successfully!");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

});
