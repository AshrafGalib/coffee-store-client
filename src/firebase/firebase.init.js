// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlxTBrqc4TT_RPg8uOXoQW_yxlbqtOgvQ",
  authDomain: "coffee-store-dcdf7.firebaseapp.com",
  projectId: "coffee-store-dcdf7",
  storageBucket: "coffee-store-dcdf7.firebasestorage.app",
  messagingSenderId: "314509897272",
  appId: "1:314509897272:web:b5eb16dade2db6acaec0cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);