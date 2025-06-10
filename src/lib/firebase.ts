// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'; // <-- Add getApps, getApp
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLw4lRdSLBbb1YQiHd0pVN5QUcZIXjrbY',
  authDomain: 'vpl-investors.firebaseapp.com',
  projectId: 'vpl-investors',
  storageBucket: 'vpl-investors.firebasestorage.app',
  messagingSenderId: '780432238970',
  appId: '1:780432238970:web:22a61ff8bd6f9beb388ec3',
};

// Initialize Firebase only if it hasn't been initialized already
// This prevents errors in Next.js development mode due to hot reloading
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services and export them as named exports
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export { app }; // <-- Export 'app' as a named export