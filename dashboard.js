import {
    auth,
    db,
    onAuthStateChanged,
    doc,
    getDoc
} from "./firebase.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const userData = userSnap.data();

            document.getElementById("displayName").textContent =
                userData.firstName;

        }

    } catch (error) {

        console.error(error);

    }

});
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".dashboard-sidebar");
const overlay = document.querySelector(".sidebar-overlay");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
});
