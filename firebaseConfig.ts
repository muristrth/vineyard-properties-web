// src/firebaseConfig.js (or .ts)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLw4lRdSLBbb1YQiHd0pVN5QUcZIXjrbY',
  authDomain: 'vpl-investors.firebaseapp.com',
  projectId: 'vpl-investors',
  storageBucket: 'vpl-investors.firebasestorage.app',
  messagingSenderId: '780432238970',
  appId: '1:780432238970:web:22a61ff8bd6f9beb388ec3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };