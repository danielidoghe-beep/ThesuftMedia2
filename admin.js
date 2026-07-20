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

// ==========================
// Firebase Config
// Replace with YOUR config
// ==========================

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// ==========================
// Protect Admin Page
// ==========================

onAuthStateChanged(auth,(user)=>{

    if(!user){

        window.location.href="admin-login.html";

        return;

    }

    loadDashboard();

});

// ==========================
// Dashboard Statistics
// ==========================

async function loadDashboard(){

    // USERS

    const users = await getDocs(collection(db,"users"));

    document.getElementById("totalUsers").textContent = users.size;

    // ORDERS

    const orders = await getDocs(collection(db,"orders"));

    document.getElementById("totalOrders").textContent = orders.size;

    // PRODUCTS

    const products = await getDocs(collection(db,"products"));

    document.getElementById("totalProducts").textContent = products.size;

    // Revenue Placeholder

    document.getElementById("totalRevenue").textContent="₦0";

    loadRecentUsers();

}

// ==========================
// Recent Users
// ==========================

async function loadRecentUsers(){

    const tbody=document.getElementById("recentUsers");

    tbody.innerHTML="";

    const q=query(

        collection(db,"users"),

        orderBy("createdAt","desc"),

        limit(10)

    );

    const snapshot=await getDocs(q);

    snapshot.forEach(doc=>{

        const user=doc.data();

        tbody.innerHTML+=`

        <tr>

            <td>${user.firstName || ""} ${user.lastName || ""}</td>

            <td>${user.email}</td>

            <td>₦${user.wallet || 0}</td>

        </tr>

        `;

    });

}

// ==========================
// Logout
// ==========================

const logoutBtn=document.getElementById("logoutBtn");

logoutBtn.addEventListener("click",async(e)=>{

    e.preventDefault();

    await signOut(auth);

    window.location.href="admin-login.html";

});
