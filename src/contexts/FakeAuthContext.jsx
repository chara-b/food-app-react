import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { fetchUser } from "../services/usersHTTPRequests";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action!");
  }
}
function AuthContextProvider({ children }) {
  const cachedUser = localStorage.getItem("user");
  const initialState = useMemo(
    () => ({
      user: cachedUser,
      isAuthenticated: cachedUser ? true : false,
    }),
    [cachedUser],
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const { user, isAuthenticated } = state;

  const login = useCallback(async (email, password) => {
    try {
      const usr = await fetchUser(email);
      console.log("fetched user: ", usr);
      if (email === usr?.[0]?.email && password === usr?.[0]?.password) {
        dispatch({ type: "login", payload: usr });
        localStorage.setItem("user", usr[0]);
      }
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* eslint-disable react-refresh/only-export-components */
function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside of its Provider");
  }
  return context;
}

export { AuthContextProvider, useAuthContext };
