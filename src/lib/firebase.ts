import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLw4lRdSLBbb1YQiHd0pVN5QUcZIXjrbY",
  authDomain: "vpl-investors.firebaseapp.com",
  projectId: "vpl-investors",
  storageBucket: "vpl-investors.firebasestorage.app",
  messagingSenderId: "780432238970",
  appId: "1:780432238970:web:22a61ff8bd6f9beb388ec3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;