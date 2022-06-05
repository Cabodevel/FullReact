import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { auth, isLoading } = useAuth();

  if (isLoading) return "Cargando";

  return <>{auth?._id ? "Autenticado" : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
