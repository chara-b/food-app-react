// react
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// css
import "./App.css";
// components
// pages
import Login from "./pages/Login.jsx";
import MainPage from "./pages/mainPage.jsx";
import Bin from "./pages/Bin.jsx";
import Error from "./pages/Error.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProtectedRoute from "./components/protected-route.jsx";
// custom hooks
// loaders for fetching data at routing
import {
  fetchProducts,
  fetchProduct,
  fetchDisabledProducts,
} from "./services/productsHTTPRequests.js";
import { FormContextProvider } from "./contexts/FormContext.jsx";
import { AuthContextProvider } from "./contexts/FakeAuthContext.jsx";

// constants

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/mainpage/:userEmail",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    loader: fetchProducts,
    errorElement: <Error />,
    children: [
      {
        path: "bin",
        element: <Bin />,
        loader: fetchDisabledProducts,
        errorElement: <Error />,
      },
      {
        path: "product/:productId",
        element: <ProductPage />,
        loader: fetchProduct,
        errorElement: <Error />,
      },
    ],
  },
  // { path: "/error", element: <Error /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return (
    <AuthContextProvider>
      <FormContextProvider>
        <RouterProvider router={router} />
      </FormContextProvider>
    </AuthContextProvider>
  );
}

export default App;
