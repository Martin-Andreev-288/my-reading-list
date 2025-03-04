import { Navigate } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Loader } from "@/components";

const UnprotectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) return <Loader />;

  return user ? <Navigate to="/" replace /> : children;
};

export default UnprotectedRoute;
