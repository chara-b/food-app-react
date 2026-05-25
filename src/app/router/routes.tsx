import { createBrowserRouter } from "react-router-dom";
// components
import ProtectedRoute from "./protected-route.tsx";
import AppLayout from "../layouts/app-layout.tsx";
// pages
import Login from "../../features/login/pages/Login.tsx";
import Bin from "../../features/bin/pages/BinPage.js";
import Error from "../pages/Error.tsx";
import PageNotFound from "../pages/PageNotFound.tsx";
import ProductPage from "../../features/product/pages/ProductPage.js";
import ProductsPage from "../../features/product/pages/ProductsPage.js";
// loaders for fetching data at routing
import {
  fetchProduct,
  fetchDisabledProducts,
  fetchAvailableProducts,
} from "../../api/productsHTTPRequests.ts";
import NewProductPage from "../../features/product/pages/NewProductPage.js";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/products" replace />,
      },
      {
        path: "products",
        element: <ProductsPage />,
        loader: fetchAvailableProducts,
        errorElement: <Error />,
      },
      {
        path: "products/product/:productId",
        element: <ProductPage />,
        loader: fetchProduct,
        errorElement: <Error />,
      },
      {
        path: "products/new-product",
        element: <NewProductPage />,
        errorElement: <Error />,
      },
      {
        path: "bin",
        element: <Bin />,
        loader: fetchDisabledProducts,
        errorElement: <Error />,
      },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);
