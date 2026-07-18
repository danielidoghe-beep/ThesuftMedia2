const amountInput = document.getElementById("amount");

const amountButtons = document.querySelectorAll(".amount-btn");

amountButtons.forEach(button => {

    button.addEventListener("click", () => {

        amountButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        amountInput.value = button.dataset.amount;

    });

});
const copyBtn = document.getElementById("copyAccountBtn");

if (copyBtn) {

    copyBtn.addEventListener("click", async () => {

        await navigator.clipboard.writeText("9117412352");

        copyBtn.textContent = "Copied";

        setTimeout(() => {

            copyBtn.textContent = "Copy";

        }, 2000);

    });

}
