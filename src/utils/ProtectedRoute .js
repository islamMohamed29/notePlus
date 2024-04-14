import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children }) {
  const currentUser = useSelector((state) => state.user?.user);
  if (!currentUser) {
    return <Navigate to="/signin" />;
  } else {
    return <>{children}</>;
  }
}
