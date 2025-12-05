// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl4DngH_e323Q6ZY7wDn6hOAVymthl64w",
  authDomain: "ads-5ccec.firebaseapp.com",
  projectId: "ads-5ccec",
  storageBucket: "ads-5ccec.firebasestorage.app",
  messagingSenderId: "498974305426",
  appId: "1:498974305426:web:8307ce1a986a7df8b5ca4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db =getFirestore(app);