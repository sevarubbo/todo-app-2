import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfjbtvJvvisi3xYducmoIfvHjVWJHj8vo",
  authDomain: "todo-app-2-d083e.firebaseapp.com",
  projectId: "todo-app-2-d083e",
  storageBucket: "todo-app-2-d083e.firebasestorage.app",
  messagingSenderId: "1059020389211",
  appId: "1:1059020389211:web:c948bf4e694933b57b787e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
