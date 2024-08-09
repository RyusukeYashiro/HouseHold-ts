// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqIyJ0kkcXICRIlGUVFKcQEvVKWLRqmrE",
  authDomain: "household-ts-6eb4e.firebaseapp.com",
  projectId: "household-ts-6eb4e",
  storageBucket: "household-ts-6eb4e.appspot.com",
  messagingSenderId: "341021210259",
  appId: "1:341021210259:web:351c8397a70f74acaa7f66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
