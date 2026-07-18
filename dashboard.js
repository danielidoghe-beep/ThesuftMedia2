import {
    auth,
    db,
   signOut,
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

const wallet = userData.wallet || 0;

const formattedWallet = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0
}).format(wallet);

document.getElementById("walletBalance").textContent = formattedWallet;
document.getElementById("walletPill").textContent = formattedWallet;

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
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        try {

            await signOut(auth);

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    });

}
