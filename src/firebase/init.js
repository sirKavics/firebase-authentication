// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdkOHx9LHoRWJw2D9YFNMMjKXlNVYPQzM",
  authDomain: "fir-practice-6da90.firebaseapp.com",
  projectId: "fir-practice-6da90",
  storageBucket: "fir-practice-6da90.firebasestorage.app",
  messagingSenderId: "393470329578",
  appId: "1:393470329578:web:63a133498881834b2e8d93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();