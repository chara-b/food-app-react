/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user, isAuthenticated, login, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      const cachedUser = JSON.parse(localStorage.getItem("user"));
      if (!isAuthenticated) {
        navigate("/");
      }
      if (cachedUser) {
        navigate(`/mainpage/${cachedUser.email}`);
      }
    },
    [isAuthenticated, navigate],
  );

  return children;
}

export default ProtectedRoute;
