import {
    auth,
    signInWithEmailAndPassword,
    signOut
} from "./firebase.js";

const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        // Only allow the admin email
        if (user.email !== "danielidoghe@gmail.com") {

            alert("Access denied. You are not an administrator.");

            await signOut(auth);

            return;

        }

        alert("Welcome Admin!");

        window.location.href = "admin-dashboard.html";

    } catch (error) {

        let message = "Login failed.";

        switch (error.code) {

            case "auth/invalid-credential":
                message = "Incorrect email or password.";
                break;

            case "auth/user-not-found":
                message = "No account found with this email.";
                break;

            case "auth/wrong-password":
                message = "Incorrect password.";
                break;

            case "auth/too-many-requests":
                message = "Too many attempts. Try again later.";
                break;

            default:
                message = error.message;
        }

        alert(message);

    }

});
