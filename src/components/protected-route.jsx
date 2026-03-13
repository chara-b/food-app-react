/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user, isAuthenticated, login, logout } = useAuthContext();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(
    function () {
      const cachedUser = JSON.parse(localStorage.getItem("user"));
      if (!isAuthenticated) {
        navigate("/");
      }
      if (cachedUser && !location.pathname.includes("mainpage")) {
        navigate(`/mainpage/${cachedUser.email.split("@")[0]}`);
      }
    },
    [isAuthenticated, location.pathname, navigate],
  );

  return children;
}

export default ProtectedRoute;
