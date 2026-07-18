const modal = document.getElementById("ticketModal");

const newTicket = document.getElementById("newTicket");
const firstTicket = document.getElementById("firstTicket");

const closeModal = document.getElementById("closeModal");
const cancelTicket = document.getElementById("cancelTicket");

const submitTicket = document.getElementById("submitTicket");

// Open popup
newTicket.onclick = () => {
    modal.style.display = "flex";
};

firstTicket.onclick = () => {
    modal.style.display = "flex";
};

// Close popup
closeModal.onclick = () => {
    modal.style.display = "none";
};

cancelTicket.onclick = () => {
    modal.style.display = "none";
};

// Close when clicking outside
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// Submit ticket to WhatsApp
submitTicket.onclick = () => {

    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const text =
`🆘 *New Support Ticket*

Subject:
${subject}

Message:
${message}`;

    const url =
`https://wa.me/2349117412352?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    modal.style.display = "none";

    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
};

// Sidebar menu
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".dashboard-sidebar");
const overlay = document.querySelector(".sidebar-overlay");

if (menuBtn && sidebar && overlay) {

    menuBtn.onclick = () => {
        sidebar.classList.add("show");
        overlay.classList.add("show");
    };

    overlay.onclick = () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
    };
}
