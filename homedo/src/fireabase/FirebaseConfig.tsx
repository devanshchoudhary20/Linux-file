import { initializeApp } from "firebase/app";
import {collection, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDtW-R9pZVhx6YkzDiCcFlzP5NzdT0-B6Y",
  authDomain: "homedo-128e2.firebaseapp.com",
  projectId: "homedo-128e2",
  storageBucket: "homedo-128e2.appspot.com",
  messagingSenderId: "944746672428",
  appId: "1:944746672428:web:6960afa88fde3bdf5a3c89",
  measurementId: "G-P7JMJVY09F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const userCollection  = collection(db,"users");
const placesCollection = collection(db,"places");
const tasksCollection = collection(db,"tasks");
const settingsCollection = collection(db,"settings");
export {
  db,
  auth,
  app,
  userCollection,
  placesCollection,
  tasksCollection,
  settingsCollection,
};