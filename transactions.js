import {
auth,
db,
onAuthStateChanged,
doc,
getDoc
} from "./firebase.js";

// Sidebar

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".dashboard-sidebar");
const overlay = document.querySelector(".sidebar-overlay");

menuBtn.onclick = () => {
sidebar.classList.toggle("active");
overlay.classList.toggle("active");
};

overlay.onclick = () => {
sidebar.classList.remove("active");
overlay.classList.remove("active");
};

// Load User

onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.href="login.html";
return;
}

const snap = await getDoc(doc(db,"users",user.uid));

if(snap.exists()){

const data=snap.data();

const balance=data.balance || 0;

document.getElementById("walletPill").innerHTML=
`₦${Number(balance).toLocaleString()}`;

}

});

// Search

const search=document.getElementById("searchInput");

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".transaction-item").forEach(item=>{

item.style.display=item.innerText.toLowerCase().includes(value)
?"flex":"none";

});

});
