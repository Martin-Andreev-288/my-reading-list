import { Navigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";

const UnprotectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) return <div>Loading...</div>;
  return user ? <Navigate to="/" replace /> : children;
};

export default UnprotectedRoute;
