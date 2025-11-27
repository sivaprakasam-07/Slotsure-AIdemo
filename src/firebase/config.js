import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCaoyzSsqoIYX4xq0VRJWSQZUWMBYcoAMg",
    authDomain: "slotsure-ai.firebaseapp.com",
    databaseURL: "https://slotsure-ai-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "slotsure-ai",
    storageBucket: "slotsure-ai.firebasestorage.app",
    messagingSenderId: "99096113250",
    appId: "1:99096113250:web:119fd2307b16dfbe4fe13b"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
