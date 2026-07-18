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

const list = document.getElementById("transactionsList");

// Sidebar
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".dashboard-sidebar");
const overlay = document.querySelector(".sidebar-overlay");

if(menuBtn){
    menuBtn.onclick = () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    };
}

if(overlay){
    overlay.onclick = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };
}

onAuthStateChanged(auth, async(user)=>{

    if(!user){
        location.href="login.html";
        return;
    }

    // Wallet Balance
    const userSnap = await getDoc(doc(db,"users",user.uid));

    if(userSnap.exists()){

        const data = userSnap.data();

        const balance = data.wallet || 0;

        document.getElementById("walletPill").innerHTML =
        "₦" + balance.toLocaleString();

    }

    // Transactions
    const transRef = collection(db,"users",user.uid,"transactions");

    const q = query(transRef, orderBy("date","desc"));

    const snap = await getDocs(q);

    if(snap.empty) return;

    list.innerHTML = "";

    snap.forEach((doc)=>{

        const t = doc.data();

        list.innerHTML += `

        <div class="dashboard-card transaction-item">

            <h3>${t.title}</h3>

            <p>${t.type}</p>

            <strong>₦${Number(t.amount).toLocaleString()}</strong>

        </div>

        `;

    });

});
