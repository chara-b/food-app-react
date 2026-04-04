// react
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// css
import "./App.css";
// components
import ProtectedRoute from "./components/protected-route.jsx";
import AppLayout from "./components/app-layout.jsx";
// pages
import Login from "./pages/Login.jsx";
import Bin from "./pages/Bin.jsx";
import Error from "./pages/Error.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
// loaders for fetching data at routing
import {
  fetchProduct,
  fetchDisabledProducts,
  fetchAvailableProducts,
} from "./services/productsHTTPRequests.js";
// contexts
import { FormContextProvider } from "./contexts/FormContext.jsx";
import { AuthContextProvider } from "./contexts/FakeAuthContext.jsx";
import { CustomModalContextProvider } from "./contexts/CustomModalContext.jsx";
import { ProductsContextProvider } from "./contexts/ProductsContext.jsx";
import NewProduct from "./pages/NewProduct.jsx";

const router = createBrowserRouter([
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
        element: <NewProduct />,
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

function App() {
  return (
    <AuthContextProvider>
      <ProductsContextProvider>
        <CustomModalContextProvider>
          <FormContextProvider>
            <RouterProvider router={router}>
              <AppLayout />
            </RouterProvider>
          </FormContextProvider>
        </CustomModalContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
