import { Navigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
