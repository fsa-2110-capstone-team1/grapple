// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvTlO3XfXw2ufDX5hdVoWjpSa4BE1ELn0",
  authDomain: "grapple-2022.firebaseapp.com",
  projectId: "grapple-2022",
  storageBucket: "grapple-2022.appspot.com",
  messagingSenderId: "78534051824",
  appId: "1:78534051824:web:151ec3af19331d13e93f35",
  measurementId: "G-GTBHNB346F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);