// firebaseConfig.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXG0OfqCGHWR4EL29-30i1Ru7o-Yn8euQ",
    authDomain: "logistechs.firebaseapp.com",
    projectId: "logistechs",
    storageBucket: "logistechs.appspot.com",
    messagingSenderId: "104684869947",
    appId: "1:104684869947:web:7a8e12a2389e7731923f1e",
    measurementId: "G-90JZK33BS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore instance to be used in other files
export { db };
