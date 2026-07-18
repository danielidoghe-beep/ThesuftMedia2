// =========================
// FAQ
// =========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("i");

    question.addEventListener("click", () => {

        document.querySelectorAll(".faq-answer").forEach(box => {
            if (box !== answer) {
                box.style.display = "none";
            }
        });

        document.querySelectorAll(".faq-question i").forEach(i => {
            if (i !== icon) {
                i.classList.remove("fa-minus");
                i.classList.add("fa-plus");
            }
        });

        if (answer.style.display === "block") {

            answer.style.display = "none";

            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");

        } else {

            answer.style.display = "block";

            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");

        }

    });

});


// =========================
// MOBILE MENU
// =========================

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {

    nav.classList.toggle("active");

});


// =========================
// DARK MODE
// =========================

const moonButton = document.querySelector(".icon-btn");

moonButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});
