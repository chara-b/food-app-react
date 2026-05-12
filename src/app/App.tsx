// react
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// css
import "./App.css";
// components
import ProtectedRoute from "./components/protected-route.js";
import AppLayout from "./components/app-layout.js";
// pages
import Login from "./pages/Login.js";
import Bin from "./pages/Bin.js";
import Error from "./pages/Error.js";
import PageNotFound from "./pages/PageNotFound.js";
import ProductPage from "./pages/ProductPage.js";
import ProductsPage from "./pages/ProductsPage.js";
// loaders for fetching data at routing
import {
  fetchProduct,
  fetchDisabledProducts,
  fetchAvailableProducts,
} from "./services/productsHTTPRequests.js";
// contexts
import { FormContextProvider } from "./contexts/FormContext.js";
import { AuthContextProvider } from "./contexts/FakeAuthContext.js";
import { CustomModalContextProvider } from "./contexts/CustomModalContext.js";
import { ProductsContextProvider } from "./contexts/ProductsContext.js";
import NewProduct from "./pages/NewProduct.js";

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
