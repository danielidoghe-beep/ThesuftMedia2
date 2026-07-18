const amountInput = document.getElementById("amount");

const amountButtons = document.querySelectorAll(".amount-btn");

amountButtons.forEach(button => {

    button.addEventListener("click", () => {

        amountButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        amountInput.value = button.dataset.amount;

    });

});
