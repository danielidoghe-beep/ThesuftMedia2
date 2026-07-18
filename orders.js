import {
    auth,
    db,
    onAuthStateChanged,
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    orderBy
} from "./firebase.js";

const ordersContainer = document.getElementById("ordersContainer");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Load wallet
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {

        const wallet = userSnap.data().wallet || 0;

        document.getElementById("walletPill").textContent =
            new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 0
            }).format(wallet);

    }

    // Load Orders
    const ordersRef = collection(db, "users", user.uid, "orders");

    const q = query(ordersRef, orderBy("date", "desc"));

    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    ordersContainer.innerHTML = "";

    snapshot.forEach(doc => {

        const order = doc.data();

        ordersContainer.innerHTML += `

        <div class="dashboard-card">

            <h3>${order.product}</h3>

            <p>${order.status}</p>

            <strong>₦${order.price}</strong>

        </div>

        `;

    });

});
