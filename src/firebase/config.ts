import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgVmK8_i3pR9HdisQsj1Ty8cMxOtIxl6M",
  authDomain: "myreadinglist-ebea7.firebaseapp.com",
  projectId: "myreadinglist-ebea7",
  storageBucket: "myreadinglist-ebea7.firebasestorage.app",
  messagingSenderId: "885364348096",
  appId: "1:885364348096:web:e4a772143f4b2b79440925",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
