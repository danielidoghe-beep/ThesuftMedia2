import {
    auth,
    sendPasswordResetEmail
} from "./firebase.js";

const form = document.getElementById("forgotForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("resetEmail").value.trim();

    try {

        await sendPasswordResetEmail(auth, email);

        alert("Password reset link has been sent to your email.");

    } catch (error) {

        alert(error.message);

    }

});
