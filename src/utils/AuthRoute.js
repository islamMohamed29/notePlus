import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function AuthRoute({ children }) {
  const currentUser = useSelector((state) => state.user?.user);
  if (currentUser) {
    return <Navigate to="/" replace />;
  } else {
    return <>{children}</>;
  }
}
