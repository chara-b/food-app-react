// react
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// css
import "./App.css";
// components
// pages
import Login from "./pages/login.jsx";
import MainPage from "./pages/MainPage.jsx";
import Bin from "./pages/Bin.jsx";
import Error from "./pages/Error.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
// custom hooks
// constants

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <MainPage /> },
  { path: "/bin", element: <Bin /> },
  { path: "/error", element: <Error /> },
  { path: "/pagenotfound", element: <PageNotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
