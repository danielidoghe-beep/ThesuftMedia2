import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLjIra8fo0myjZ60wkWcn8XjWdIpNOxM8",
    authDomain: "thesuftmedia2.firebaseapp.com",
    projectId: "thesuftmedia2",
    storageBucket: "thesuftmedia2.firebasestorage.app",
    messagingSenderId: "50283311808",
    appId: "1:50283311808:web:530aee4b95a76d57b4b325",
    measurementId: "G-CGEXWPJGP3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {
    auth,
    provider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
};
