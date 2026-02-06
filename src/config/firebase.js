import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoVQJv9N81jEJl0PvANAnJwjJLJhb5B_4",
  authDomain: "login-page-63654.firebaseapp.com",
  projectId: "login-page-63654",
  storageBucket: "login-page-63654.firebasestorage.app",
  messagingSenderId: "116100844947",
  appId: "1:116100844947:web:538efb739f312d841c6c66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
