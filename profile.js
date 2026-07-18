import {
    auth,
    db,
    doc,
    getDoc,
    updateDoc
} from "./firebase.js";

import {
    updatePassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

const bigAvatar = document.getElementById("bigAvatar");
const smallAvatar = document.getElementById("profileAvatar");

const profileForm = document.getElementById("profileForm");
const passwordForm = document.getElementById("passwordForm");

let currentUser = null;

// Load Profile
auth.onAuthStateChanged(async(user)=>{

    if(!user){

        window.location.href="login.html";
        return;

    }

    currentUser=user;

    const snap=await getDoc(doc(db,"users",user.uid));

    if(!snap.exists()) return;

    const data=snap.data();

    firstNameInput.value=data.firstName||"";
    lastNameInput.value=data.lastName||"";
    emailInput.value=data.email||"";

    profileName.innerHTML=
        `${data.firstName} ${data.lastName}`;

    profileEmail.innerHTML=data.email;

    const initials=
        (data.firstName?.charAt(0)||"")+
        (data.lastName?.charAt(0)||"");

    bigAvatar.innerHTML=initials.toUpperCase();
    smallAvatar.innerHTML=initials.toUpperCase();

});

// Save Profile
profileForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    await updateDoc(
        doc(db,"users",currentUser.uid),
        {
            firstName:firstNameInput.value.trim(),
            lastName:lastNameInput.value.trim()
        }
    );

    alert("Profile updated successfully!");

    location.reload();

});

// Change Password
passwordForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const newPassword=document
        .getElementById("newPassword").value;

    const confirmPassword=document
        .getElementById("confirmPassword").value;

    if(newPassword!==confirmPassword){

        alert("Passwords do not match");
        return;

    }

    try{

        await updatePassword(currentUser,newPassword);

        alert("Password updated successfully");

        passwordForm.reset();

    }catch(error){

        alert(error.message);

    }

});
