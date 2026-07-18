import {
    auth,
    db,
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    orderBy
} from "./firebase.js";

// Sidebar
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".dashboard-sidebar");
const overlay = document.querySelector(".sidebar-overlay");

if (menuBtn) {
    menuBtn.onclick = () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    };
}

if (overlay) {
    overlay.onclick = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };
}

// Wait until user is signed in
auth.onAuthStateChanged(async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Wallet
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {

        const balance = userSnap.data().wallet || 0;

        const pill = document.getElementById("walletPill");

        if (pill) {
            pill.innerHTML = "₦" + balance.toLocaleString();
        }

    }

    // Notifications
    loadNotifications(user.uid);

});

async function loadNotifications(uid) {

    const list = document.getElementById("notificationsList");

    const notificationsRef = collection(
        db,
        "users",
        uid,
        "notifications"
    );

    const q = query(
        notificationsRef,
        orderBy("time", "desc")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

        list.innerHTML = `
        <div class="empty-card">

            <div class="empty-icon">
                <i class="fa-regular fa-bell"></i>
            </div>

            <h3>No notifications</h3>

            <p>
            We'll notify you about orders,
            support replies and more.
            </p>

        </div>
        `;

        return;

    }

    let html = "";

    snapshot.forEach(docSnap => {

        const data = docSnap.data();

        html += `

        <div class="dashboard-card" style="margin-bottom:20px">

            <h3>${data.title}</h3>

            <p style="margin:10px 0;">
                ${data.message}
            </p>

            <small style="color:#888;">
                ${new Date(data.time.seconds * 1000).toLocaleString()}
            </small>

        </div>

        `;

    });

    list.innerHTML = html;

}
