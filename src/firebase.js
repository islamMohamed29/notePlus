import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDokHPFIlYJ1isJxsQO-J2_51xgiwihe0o",
  authDomain: "notes-todos-application.firebaseapp.com",
  projectId: "notes-todos-application",
  storageBucket: "notes-todos-application.appspot.com",
  messagingSenderId: "607679287785",
  appId: "1:607679287785:web:606783d3c0cc1fa7463b78"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
setPersistence(auth, browserSessionPersistence);
