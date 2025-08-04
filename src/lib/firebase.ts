import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCLw4lRdSLBbb1YQiHd0pVN5QUcZIXjrbY",
    authDomain: "vpl-investors.firebaseapp.com",
    projectId: "vpl-investors",
    storageBucket: "vpl-investors.firebasestorage.app",
    messagingSenderId: "780432238970",
    appId: "1:780432238970:web:22a61ff8bd6f9beb388ec3"
};

let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db, app };