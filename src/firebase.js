import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBZSgRmS7vZDmp0pCGy-V_qb34imoKuJJo",
  authDomain: "note-plus-redux-app.firebaseapp.com",
  projectId: "note-plus-redux-app",
  storageBucket: "note-plus-redux-app.appspot.com",
  messagingSenderId: "411813999021",
  appId: "1:411813999021:web:446fa01f4c20489732b124",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
setPersistence(auth, browserSessionPersistence);
