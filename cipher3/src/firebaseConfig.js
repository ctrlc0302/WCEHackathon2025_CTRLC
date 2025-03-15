// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-w1NxAV-YYwLlNDYCm6nV8F6IvT79gbw",
  authDomain: "cipher-6625b.firebaseapp.com",
  projectId: "cipher-6625b",
  storageBucket: "cipher-6625b.firebasestorage.app",
  messagingSenderId: "469574226769",
  appId: "1:469574226769:web:de68e40e3a1d8549953970",
  measurementId: "G-649143PHX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);