import {
    auth,
    db,

    onAuthStateChanged,
    signOut,

    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp

} from "./firebase.js";

// Protect page

onAuthStateChanged(auth, (user) => {

    if (!user) {
        location.href = "admin-login.html";
        return;
    }

    loadProducts();

});

// Load Products

async function loadProducts() {

    const table = document.getElementById("productsTable");

    table.innerHTML = "";

    const snapshot = await getDocs(collection(db, "products"));

    snapshot.forEach((productDoc) => {

        const product = productDoc.data();

        table.innerHTML += `

        <tr>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>₦${product.price}</td>

            <td>${product.stock}</td>

            <td>

                <button
                class="primary-btn"
                onclick="deleteProduct('${productDoc.id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// Delete Product

window.deleteProduct = async (id) => {

    if (!confirm("Delete this product?")) return;

    await deleteDoc(doc(db, "products", id));

    loadProducts();

};

// Add Product

document.getElementById("addProductBtn").onclick = async () => {

    const name = prompt("Product Name");

    if (!name) return;

    const category = prompt("Category");

    if (!category) return;

    const price = prompt("Price");

    if (!price) return;

    const stock = prompt("Stock");

    if (!stock) return;

    await addDoc(collection(db, "products"), {

        name,

        category,

        price: Number(price),

        stock: Number(stock),

        createdAt: serverTimestamp()

    });

    alert("Product added successfully.");

    loadProducts();

};

// Logout

document.getElementById("logoutBtn").onclick = async () => {

    await signOut(auth);

    location.href = "admin-login.html";

};
