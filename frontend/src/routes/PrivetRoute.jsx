import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

function PrivetRoute() {
  const { user, loading } = useAuth();
  if (loading) return;

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={"/auth/signin"} />;
}

export default PrivetRoute;
