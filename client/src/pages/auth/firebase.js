// Import the functions you need from the SDKs you need
import {getAuth, OAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ms-login-26360.firebaseapp.com",
  projectId: "ms-login-26360",
  storageBucket: "ms-login-26360.firebasestorage.app",
  messagingSenderId: "173137007937",
  appId: "1:173137007937:web:4322727a56e1629f25fdc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new OAuthProvider('microsoft.com')

export {auth,provider}