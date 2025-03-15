// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD-w1NxAV-YYwLlNDYCm6nV8F6IvT79gbw',
  authDomain: 'cipher-6625b.firebaseapp.com',
  projectId: 'cipher-6625b',
  storageBucket: 'cipher-6625b.appspot.com', // Fixed storageBucket format
  messagingSenderId: '469574226769',
  appId: '1:469574226769:web:de68e40e3a1d8549953970',
  measurementId: 'G-649143PHX2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, app };
