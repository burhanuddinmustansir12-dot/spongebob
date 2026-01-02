// Simple test to check Firebase configuration
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6YaOF5NFEBC-t6VFTEeMSYYyao58nxvU",
  authDomain: "burhan-5c22a.firebaseapp.com",
  projectId: "burhan-5c22a",
  storageBucket: "burhan-5c22a.firebasestorage.app",
  messagingSenderId: "296873762540",
  appId: "1:296873762540:web:1d931761b4dfe6e11c8fc9",
  measurementId: "G-8WXC1DVE8R"
};

console.log('Testing Firebase configuration...');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);

try {
  const app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized successfully!');
  console.log('App name:', app.name);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
}
