import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("auth_token");
  const isValid = token === import.meta.env.VITE_SECRET_KEY;

  return isValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
