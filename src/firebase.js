import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
import 'firebase/auth'
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBSag8XyTFfKmtq2vQLn2f8UYZM-bq53c8",
    authDomain: "messenger-11a26.firebaseapp.com",
    projectId: "messenger-11a26",
    storageBucket: "messenger-11a26.appspot.com",
    messagingSenderId: "512000249923",
    appId: "1:512000249923:web:23548c878eda0d4b1604f6",
    measurementId: "G-TFJM3YW9M7"
});

const db = getFirestore(firebaseApp);
export default db;