import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import { app } from "./firebase.js";

const db = getFirestore(app);

const updatesContainer = document.getElementById("updatesContainer");
const updatesCount = document.getElementById("updatesCount");

const updatesRef = collection(db, "updates");

const q = query(
    updatesRef,
    orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {

    updatesContainer.innerHTML = "";

    updatesCount.textContent = `${snapshot.size} Updates Available`;

    if (snapshot.empty) {

        updatesContainer.innerHTML = `
            <div class="empty-updates">

                <i class="fa-regular fa-folder-open"></i>

                <h2>No Updates</h2>

                <p>
                    There are no updates available at the moment.
                    Please check back later.
                </p>

            </div>
        `;

        return;
    }

    snapshot.forEach(doc => {

        const data = doc.data();

        updatesContainer.innerHTML += `

        <div class="update-card">

            <img
                src="${data.image}"
                alt="${data.title}"
                class="update-image"
            >

            <div class="update-info">

                <h3>${data.title}</h3>

                <p>${data.description}</p>

                <small>
                    ${new Date(data.createdAt.seconds * 1000)
                        .toLocaleDateString()}
                </small>

            </div>

        </div>

        `;
    });

});
