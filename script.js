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

const moonButton = document.querySelector(".theme-btn");

moonButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});
/* ==========================
   LOGIN PAGE
========================== */

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        const icon = togglePassword.querySelector("i");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    });

}
/* ==========================
   REGISTER PAGE
========================== */

// Show / Hide Password

const registerTogglePassword = document.querySelector(".toggle-password");
const registerPasswordInput = document.querySelector(".password-box input");

if (registerTogglePassword && registerPasswordInput) {

    registerTogglePassword.addEventListener("click", () => {

        if (registerPasswordInput.type === "password") {

            registerPasswordInput.type = "text";
            registerTogglePassword.innerHTML =
                '<i class="fa-regular fa-eye-slash"></i>';

        } else {

            registerPasswordInput.type = "password";
            registerTogglePassword.innerHTML =
                '<i class="fa-regular fa-eye"></i>';

        }

    });

}

// Create Account Button

const createBtn = document.querySelector(".primary-btn");

if (createBtn) {

    createBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const firstName = document.querySelectorAll(".input-group input")[0].value.trim();
        const lastName = document.querySelectorAll(".input-group input")[1].value.trim();
        const email = document.querySelectorAll(".input-group input")[2].value.trim();
        const password = document.querySelector(".password-box input").value.trim();

        if (!firstName || !lastName || !email || !password) {

            alert("Please fill in all fields.");

            return;

        }

        // Firebase registration will be added later.

        window.location.href = "login.html";

    });

}
