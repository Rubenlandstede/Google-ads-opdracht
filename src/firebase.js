// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLhm0L_a7dcS61wu6cjgxPsy9hxSfwhzM",
  authDomain: "ads-d717f.firebaseapp.com",
  projectId: "ads-d717f",
  storageBucket: "ads-d717f.firebasestorage.app",
  messagingSenderId: "703437243864",
  appId: "1:703437243864:web:58afdb1b0c6569f0015ead"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);

