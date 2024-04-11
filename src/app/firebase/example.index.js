// Firebase config

import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "API key",
    authDomain: "auth domain",
    projectId: "project if",
    storageBucket: "storage bucket",
    messagingSenderId: "messaging SenderId",
    appId: "app Id"
};

// Initialize Firebase
export default initializeApp(firebaseConfig);