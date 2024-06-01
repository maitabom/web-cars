// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_RkR5EigqPCIukhtkERsHTpUcEFuOWjY",
  authDomain: "webcarros-fdd75.firebaseapp.com",
  projectId: "webcarros-fdd75",
  storageBucket: "webcarros-fdd75.appspot.com",
  messagingSenderId: "898035068755",
  appId: "1:898035068755:web:3e538c3c1c805bef7dfba6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { database, auth, storage };
