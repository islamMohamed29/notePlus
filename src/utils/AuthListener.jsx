import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "../redux/slices/user-slice";
import { clearTodos } from "../redux/slices/todos-slice";
import { clearNotes } from "../redux/slices/notes-slice";
import { auth } from "../firebase";
import LoadingScreen from "./LoadingScreen";
export default function AuthListener({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        const { uid, displayName, email: userEmail, photoURL } = currentUser;
        let userData = {
          uid,
          displayName,
          email: userEmail,
          photoURL,
        };
        dispatch(setUser(userData));
        setLoading(false);
      } else {
        setLoading(false);
        dispatch(clearUser());
        dispatch(clearNotes());
        dispatch(clearTodos());
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch]);

  return loading ? <LoadingScreen /> : children;
}
