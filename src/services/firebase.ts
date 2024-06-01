// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebaseConfigData from "./keys/firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = firebaseConfigData;
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { database, auth, storage };
