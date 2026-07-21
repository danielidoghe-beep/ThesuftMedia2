import {
    auth,
    db,

    onAuthStateChanged,
    signOut,

    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    doc
} from "./firebase.js";

// Protect page

onAuthStateChanged(auth, (user) => {

    if (!user) {
        location.href = "admin-login.html";
        return;
    }

    loadOrders();

});

// Load Orders

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

            <td>${order.name || "-"}</td>

            <td>${order.product || "-"}</td>

            <td>₦${order.amount || 0}</td>

            <td>${order.status || "Pending"}</td>

            <td>

                <button
                class="primary-btn"
                onclick="completeOrder('${orderDoc.id}')">

                Complete

                </button>

            </td>

        </tr>

        `;

    });

}

// Complete Order

window.completeOrder = async (id) => {

    await updateDoc(doc(db, "orders", id), {

        status: "Completed"

    });

    alert("Order completed.");

    loadOrders();

};

// Logout

document.getElementById("logoutBtn").onclick = async () => {

    await signOut(auth);

    location.href = "admin-login.html";

};
