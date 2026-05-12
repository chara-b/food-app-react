// react
import { RouterProvider } from "react-router-dom";
// css
import "./App.css";
// components
import AppLayout from "./components/app-layout.js";
// contexts
import { FormContextProvider } from "./providers/FormContext.tsx";
import { AuthContextProvider } from "./providers/FakeAuthContext.tsx";
import { CustomModalContextProvider } from "./providers/CustomModalContext.tsx";
import { ProductsContextProvider } from "./providers/ProductsContext.tsx";

import { router } from "./router/index.tsx";

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
