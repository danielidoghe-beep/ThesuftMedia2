import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export {
    auth,
    db,
    provider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,

    doc,
    getDoc,
    setDoc,
    updateDoc,

    collection,
    getDocs,
    query,
    orderBy
};
