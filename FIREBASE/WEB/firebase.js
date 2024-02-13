import { initializeApp } from "firebase/app"; //! npm i firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCcAezgRG3Q558EPXAjKV5GVcT-6f7Ya7o",
  authDomain: "birkenhead-point-ar-web.firebaseapp.com",
  projectId: "birkenhead-point-ar-web",
  storageBucket: "birkenhead-point-ar-web.appspot.com",
  messagingSenderId: "480495514261",
  appId: "1:480495514261:web:d334fa1efe3e9941d2619c",
  measurementId: "G-6QVKZ6LWHD",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firebase authentication instance
const auth = getAuth(firebaseApp);

// Function to handle user sign up
function signUpWithEmailAndPassword(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Function to handle user sign in
function signInWithEmailPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export { signUpWithEmailAndPassword, signInWithEmailPassword };