import { Navigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Loader } from "@/components";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) return <Loader />;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
