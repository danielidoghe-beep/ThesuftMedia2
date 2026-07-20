import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// ======================
// Firebase Config
// ======================

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

// ======================
// Protect Admin Page
// ======================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "admin-login.html";

        return;

    }

    loadOrders();

});

// ======================
// Load Orders
// ======================

async function loadOrders() {

    const tbody = document.getElementById("ordersTable");

    tbody.innerHTML = "";

    const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((orderDoc) => {

        const order = orderDoc.data();

        tbody.innerHTML += `

        <tr>

            <td>${order.orderId || orderDoc.id}</td>

            <td>${order.name || "Unknown"}</td>

            <td>${order.product || "-"}</td>

            <td>₦${order.amount || 0}</td>

            <td>${order.status || "Pending"}</td>

            <td>

                <button
                    class="complete-btn"
                    onclick="completeOrder('${orderDoc.id}')">

                    Complete

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================
// Complete Order
// ======================

window.completeOrder = async (id) => {

    await updateDoc(doc(db, "orders", id), {

        status: "Completed"

    });

    alert("Order completed successfully.");

    loadOrders();

};

// ======================
// Logout
// ======================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        await signOut(auth);

        window.location.href = "admin-login.html";

    });

}
