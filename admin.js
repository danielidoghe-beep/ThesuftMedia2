// =============================
// Firebase
// =============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "XXXXXXXX",

    appId: "XXXXXXXX"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// =============================
// Check Login
// =============================

onAuthStateChanged(auth, async (user)=>{

    if(!user){

        location.href="admin-login.html";

        return;

    }

    loadDashboard();

});

// =============================
// Dashboard
// =============================

async function loadDashboard(){

    // USERS

    const usersSnapshot = await getDocs(collection(db,"users"));

    document.getElementById("totalUsers").textContent =
    usersSnapshot.size;

    // ORDERS

    const ordersSnapshot = await getDocs(collection(db,"orders"));

    document.getElementById("totalOrders").textContent =
    ordersSnapshot.size;

    // PRODUCTS

    const productsSnapshot = await getDocs(collection(db,"products"));

    document.getElementById("totalProducts").textContent =
    productsSnapshot.size;

    loadRecentUsers();

}

// =============================
// Recent Users
// =============================

async function loadRecentUsers(){

    const q=query(

        collection(db,"users"),

        orderBy("createdAt","desc"),

        limit(10)

    );

    const snapshot=await getDocs(q);

    const tbody=document.getElementById("recentUsers");

    tbody.innerHTML="";

    snapshot.forEach(doc=>{

        const user=doc.data();

        tbody.innerHTML+=`

        <tr>

            <td>${user.firstName} ${user.lastName}</td>

            <td>${user.email}</td>

            <td>${user.wallet || 0}</td>

        </tr>

        `;

    });

}

// =============================
// Logout
// =============================

document.getElementById("logoutBtn").onclick=async()=>{

    await signOut(auth);

    location.href="admin-login.html";

};
