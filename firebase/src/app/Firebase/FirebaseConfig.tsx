import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAL_j1hRz_CwIJmuwZ9QDxMjK5bSU4WXsM",
    authDomain: "loginpage-4ba82.firebaseapp.com",
    projectId: "loginpage-4ba82",
    storageBucket: "loginpage-4ba82.appspot.com",
    messagingSenderId: "385892793397",
    appId: "1:385892793397:web:fd0e07b53d1db21c89c57c",
    measurementId: "G-VK92BZL34D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export {auth, db, app};