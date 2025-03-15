// Import the functions you need from the SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Authentication
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-w1NxAV-YYwLlNDYCm6nV8F6IvT79gbw",
    authDomain: "cipher-6625b.firebaseapp.com",
    projectId: "cipher-6625b",
    storageBucket: "cipher-6625b.firebasestorage.app",
    messagingSenderId: "469574226769",
    appId: "1:469574226769:web:de68e40e3a1d8549953970",
    measurementId: "G-649143PHX2"
};

// Check if Firebase has already been initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, db, auth };
