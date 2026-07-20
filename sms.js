// ===============================
// BUY SMS NUMBER ON WHATSAPP
// ===============================

const whatsappNumber = "2349117412352"; // Change to your WhatsApp number

document.querySelectorAll(".buy-sms-btn").forEach(button => {
    button.addEventListener("click", () => {

        const country = button.dataset.country;

        const message = `Hello TheSuftMedia,

I want to buy a ${country} SMS verification number.

Please send me the available numbers and price.`;

        const url =
            `https://wa.me/${2349117412352}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    });
});
