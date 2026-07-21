import {
    auth,
    db,

    onAuthStateChanged,
    signOut,

    collection,
    getDocs,
    addDoc,
    serverTimestamp

} from "./firebase.js";

// Protect Page

onAuthStateChanged(auth, (user) => {

    if (!user) {
        location.href = "admin-login.html";
        return;
    }

});

// Send Notification

document.getElementById("sendNotificationBtn").onclick = async () => {

    const title = document.getElementById("title").value.trim();

    const message = document.getElementById("message").value.trim();

    if (!title || !message) {

        alert("Please fill all fields.");

        return;

    }

    const users = await getDocs(collection(db, "users"));

    for (const user of users.docs) {

        await addDoc(collection(db, "notifications"), {

            uid: user.id,

            title,

            message,

            read: false,

            createdAt: serverTimestamp()

        });

    }

    alert("Notification sent successfully.");

    document.getElementById("title").value = "";

    document.getElementById("message").value = "";

};

// Logout

document.getElementById("logoutBtn").onclick = async () => {

    await signOut(auth);

    location.href = "admin-login.html";

};
