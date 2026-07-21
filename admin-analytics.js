import {
    auth,
    db,

    onAuthStateChanged,
    signOut,

    collection,
    getDocs

} from "./firebase.js";

// Protect page

onAuthStateChanged(auth, (user) => {

    if (!user) {
        location.href = "admin-login.html";
        return;
    }

    loadAnalytics();

});

// Load Analytics

async function loadAnalytics() {

    // USERS

    const usersSnap = await getDocs(collection(db, "users"));

    document.getElementById("totalUsers").textContent =
        usersSnap.size;

    let totalWallet = 0;

    usersSnap.forEach((doc) => {

        const user = doc.data();

        totalWallet += Number(user.wallet || 0);

    });

    document.getElementById("walletBalance").textContent =
        "₦" + totalWallet.toLocaleString();


    // PRODUCTS

    const productsSnap = await getDocs(collection(db, "products"));

    document.getElementById("totalProducts").textContent =
        productsSnap.size;


    // ORDERS

    const ordersSnap = await getDocs(collection(db, "orders"));

    document.getElementById("totalOrders").textContent =
        ordersSnap.size;

    let revenue = 0;

    ordersSnap.forEach((doc) => {

        const order = doc.data();

        revenue += Number(order.amount || 0);

    });

    document.getElementById("totalRevenue").textContent =
        "₦" + revenue.toLocaleString();


    // FUNDING REQUESTS

    const fundingSnap = await getDocs(
        collection(db, "fundingRequests")
    );

    document.getElementById("totalFunding").textContent =
        fundingSnap.size;

}

// Logout

document.getElementById("logoutBtn").onclick = async () => {

    await signOut(auth);

    location.href = "admin-login.html";

};
