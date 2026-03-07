// react
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// css
import "./App.css";
// components
// pages
import Login from "./pages/login.jsx";
import MainPage from "./pages/mainPage.jsx";
import Bin from "./pages/Bin.jsx";
import Error from "./pages/Error.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ProductPage from "./pages/ProductPage.jsx";
// custom hooks
// loaders for fetching data at routing
import {
  fetchProducts,
  fetchProduct,
} from "./services/productsHTTPRequests.js";

// constants

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <MainPage />,
    loader: fetchProducts,
    errorElement: <Error />,
    children: [
      { path: "bin", element: <Bin /> },
      {
        path: "product/:productId",
        element: <ProductPage />,
        loader: fetchProduct,
        errorElement: <Error />,
      },
    ],
  },
  { path: "/error", element: <Error /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
