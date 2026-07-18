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

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const menuIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

    } else {

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    }

});

// =========================
// DARK MODE
// =========================

const moonButton = document.querySelector(".icon-btn");

moonButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});
