import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ======================
// Firebase Config
// Replace with yours
// ======================

const firebaseConfig = {

    apiKey:"YOUR_API_KEY",

    authDomain:"YOUR_PROJECT.firebaseapp.com",

    projectId:"YOUR_PROJECT_ID",

    storageBucket:"YOUR_PROJECT.appspot.com",

    messagingSenderId:"YOUR_SENDER_ID",

    appId:"YOUR_APP_ID"

};

const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);

// ======================
// Protect Page
// ======================

onAuthStateChanged(auth,(user)=>{

    if(!user){

        location.href="admin-login.html";

        return;

    }

    loadUsers();

});

// ======================
// Load Users
// ======================

async function loadUsers(){

    const tbody=document.getElementById("usersTable");

    tbody.innerHTML="";

    const snapshot=await getDocs(collection(db,"users"));

    snapshot.forEach((doc)=>{

        const user=doc.data();

        tbody.innerHTML+=`

        <tr>

        <td>${user.firstName || ""} ${user.lastName || ""}</td>

        <td>${user.email}</td>

        <td>₦${user.wallet || 0}</td>

        <td>

        <span style="color:green;font-weight:bold;">

        Active

        </span>

        </td>

        <td>

        <button
class="action-btn"
onclick="location.href='admin-user-details.html?id=${doc.id}'">
View
</button>

        </td>

        </tr>

        `;

    });

}

// ======================
// Logout
// ======================

document.getElementById("logoutBtn").onclick=async()=>{

    await signOut(auth);

    location.href="admin-login.html";

};
