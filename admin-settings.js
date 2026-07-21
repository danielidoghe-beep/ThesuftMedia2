import {
    auth,
    db,

    onAuthStateChanged,
    signOut,

    doc,
    getDoc,
    setDoc

} from "./firebase.js";

// Protect page

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        location.href = "admin-login.html";
        return;
    }

    loadSettings();

});

// Load Settings

async function loadSettings() {

    const settingsRef = doc(db, "settings", "platform");

    const settingsSnap = await getDoc(settingsRef);

    if (!settingsSnap.exists()) return;

    const data = settingsSnap.data();

    document.getElementById("siteName").value =
        data.siteName || "";

    document.getElementById("supportEmail").value =
        data.supportEmail || "";

    document.getElementById("whatsapp").value =
        data.whatsapp || "";

    document.getElementById("telegram").value =
        data.telegram || "";

    document.getElementById("bankName").value =
        data.bankName || "";

    document.getElementById("accountName").value =
        data.accountName || "";

    document.getElementById("accountNumber").value =
        data.accountNumber || "";

}

// Save Settings

document.getElementById("saveSettingsBtn").onclick = async () => {

    const siteName =
        document.getElementById("siteName").value.trim();

    const supportEmail =
        document.getElementById("supportEmail").value.trim();

    const whatsapp =
        document.getElementById("whatsapp").value.trim();

    const telegram =
        document.getElementById("telegram").value.trim();

    const bankName =
        document.getElementById("bankName").value.trim();

    const accountName =
        document.getElementById("accountName").value.trim();

    const accountNumber =
        document.getElementById("accountNumber").value.trim();

    await setDoc(doc(db, "settings", "platform"), {

        siteName,
        supportEmail,
        whatsapp,
        telegram,
        bankName,
        accountName,
        accountNumber

    });

    alert("Settings saved successfully.");

};

// Logout

document.getElementById("logoutBtn").onclick = async () => {

    await signOut(auth);

    location.href = "admin-login.html";

};
