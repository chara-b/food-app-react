/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user, isAuthenticated, login, logout } = useAuthContext();
  const navigate = useNavigate();

  // const location = useLocation();

  // useEffect(
  //   function () {
  // if (!isAuthenticated) {
  //   navigate("/login", { replace: true });
  // }
  // if (user && location.pathname === "/login") {
  //   navigate(`/products`, { replace: true });
  // }
  //   },
  //   [isAuthenticated, navigate],
  // );
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
