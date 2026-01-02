// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6YaOF5NFEBC-t6VFTEeMSYYyao58nxvU",
  authDomain: "burhan-5c22a.firebaseapp.com",
  projectId: "burhan-5c22a",
  storageBucket: "burhan-5c22a.firebasestorage.app",
  messagingSenderId: "296873762540",
  appId: "1:296873762540:web:1d931761b4dfe6e11c8fc9",
  measurementId: "G-8WXC1DVE8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  }).catch(() => {
    // Analytics not supported in this environment
  });
}

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, analytics };
