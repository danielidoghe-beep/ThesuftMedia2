import {
    auth,
    db,
    provider,
    signInWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    collection,
    addDoc,
    serverTimestamp
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

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Create notification
            await addDoc(
                collection(db, "users", userCredential.user.uid, "notifications"),
                {
                    title: "Welcome Back 👋",
                    message: "You signed in successfully.",
                    time: serverTimestamp(),
                    read: false
                }
            );

            window.location.href = "dashboard.html";

        } catch (error) {

            alert(error.message);

        }

    });

}

// =========================
// Google Sign In
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
// Google Redirect Result
// =========================

getRedirectResult(auth)

.then(async (result) => {

    if (!result) return;

    const user = result.user;

    await addDoc(
        collection(db, "users", user.uid, "notifications"),
        {
            title: "Welcome Back 👋",
            message: "You signed in successfully with Google.",
            time: serverTimestamp(),
            read: false
        }
    );

    window.location.href = "dashboard.html";

})

.catch((error) => {

    alert(error.message);

});
