import {
    auth,
    db,
    provider,
    createUserWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    doc,
    setDoc
} from "./firebase.js";

// =========================
// Email Registration
// =========================

const form = document.getElementById("registerForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db, "users", userCredential.user.uid), {
                firstName,
                lastName,
                email
            });

            alert("Account created successfully!");

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    });

}

// =========================
// Google Registration
// =========================

const googleBtn = document.getElementById("googleRegister");

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
.then(async (result) => {

    if (!result) return;

    const user = result.user;

    const names = (user.displayName || "").split(" ");

    const firstName = names[0] || "User";
    const lastName = names.slice(1).join(" ");

    await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email: user.email
    });

    window.location.href = "dashboard.html";

})
.catch((error) => {

    alert(error.message);

});
