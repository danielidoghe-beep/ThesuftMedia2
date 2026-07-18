import {
    auth,
    provider,
    signInWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult
} from "./firebase.js";

// =========================
// Email & Password Login
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {

            await signInWithEmailAndPassword(auth, email, password);

            window.location.href = "dashboard.html";

        } catch (error) {

            alert(error.message);

        }

    });

}

// =========================
// Google Sign In (Redirect)
// =========================

const googleBtn = document.getElementById("googleSignIn");

if (googleBtn) {

    googleBtn.addEventListener("click", async () => {

        try {

            await signInWithRedirect(auth, provider);

        } catch (error) {

            alert(error.message);

        }

    });

}

// =========================
// After Google Redirect
// =========================

getRedirectResult(auth)
.then((result) => {

    if (result && result.user) {

        window.location.href = "dashboard.html";

    }

})
.catch((error) => {

    alert(error.message);

});
