import {
    auth,
    db,

    onAuthStateChanged,
    signOut,

    collection,
    getDocs,
    query,
    orderBy,

    doc,
    getDoc,
    updateDoc,
    addDoc,

    serverTimestamp,
    increment

} from "./firebase.js";

// Protect page

onAuthStateChanged(auth, (user) => {

    if (!user) {
        location.href = "admin-login.html";
        return;
    }

    loadFundingRequests();

});

// Load Requests

async function loadFundingRequests() {

    const table = document.getElementById("fundingTable");

    table.innerHTML = "";

    const q = query(
        collection(db, "fundingRequests"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((requestDoc) => {

        const request = requestDoc.data();

        table.innerHTML += `

        <tr>

            <td>${request.name}</td>

            <td>₦${request.amount}</td>

            <td>${request.bank}</td>

            <td>${request.status}</td>

            <td>

                <button
                class="primary-btn"
                onclick="approveFunding('${requestDoc.id}')">

                Approve

                </button>

                <button
                class="danger-btn"
                onclick="rejectFunding('${requestDoc.id}')">

                Reject

                </button>

            </td>

        </tr>

        `;

    });

}

// Approve

window.approveFunding = async (id) => {

    const fundingRef = doc(db, "fundingRequests", id);

    const fundingSnap = await getDoc(fundingRef);

    if (!fundingSnap.exists()) return;

    const funding = fundingSnap.data();

    // Update wallet

    await updateDoc(doc(db, "users", funding.uid), {

        wallet: increment(funding.amount)

    });

    // Update request

    await updateDoc(fundingRef, {

        status: "Approved"

    });

    // Notification

    await addDoc(collection(db, "notifications"), {

        uid: funding.uid,

        title: "Wallet Funded",

        message: `₦${funding.amount} has been added to your wallet.`,

        createdAt: serverTimestamp()

    });

    alert("Funding approved.");

    loadFundingRequests();

};

// Reject

window.rejectFunding = async (id) => {

    await updateDoc(doc(db, "fundingRequests", id), {

        status: "Rejected"

    });

    alert("Funding rejected.");

    loadFundingRequests();

};

// Logout

document.getElementById("logoutBtn").onclick = async () => {

    await signOut(auth);

    location.href = "admin-login.html";

};
