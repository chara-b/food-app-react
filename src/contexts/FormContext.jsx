/* eslint-disable no-unused-vars */
import {
  createContext,
  useActionState,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createNewProduct,
  updateProduct,
} from "../services/productsHTTPRequests.js";
import { useForm } from "../hooks/useForm.jsx";
import { useAuthContext } from "./FakeAuthContext.jsx";

const FormContext = createContext(null);

function FormContextProvider({ children }) {
  const { formState, onChange, formErrors, validateForm, isFormValid } =
    useForm();

  const { user, isAuthenticated, login, logout } = useAuthContext();

  const submitLogin = useCallback(
    async (formData) => {
      console.log(formData);

      const { formErrors, isFormValid } = validateForm({
        email: { value: formData.email, rules: { required: true } },
        password: { value: formData.password, rules: { required: true } },
      });

      if (!isFormValid) {
        return { success: false, formErrors };
      }

      try {
        await login(formData.email, formData.password);
        return { success: true };
      } catch (error) {
        return { error };
      }
    },
    [login, validateForm],
  );

  async function submitNewProduct(newProduct) {
    try {
      const result = await createNewProduct(newProduct);
      console.log("newProduct submitted: ", result);
    } catch (error) {
      console.error("Failed to submit new product:", error);
    }
  }

  async function updateProductDetails(productDetails) {
    try {
      const result = await updateProduct(productDetails);
      console.log("product details updated: ", result);
    } catch (error) {
      console.error("Failed to update product details:", error);
    }
  }

  function submitNewInputFields() {}

  const value = useMemo(
    () => ({
      formState,
      formErrors,
      isFormValid,
      onChange,
      user,
      isAuthenticated,
      logout,
      submitLogin,
      submitNewProduct,
      updateProductDetails,
      submitNewInputFields,
    }),
    [
      formErrors,
      formState,
      isAuthenticated,
      isFormValid,
      logout,
      onChange,
      submitLogin,
      user,
    ],
  );
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

/* eslint-disable react-refresh/only-export-components */
function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("FormContext was used outside of its Provider");
  }
  return context;
}

export { FormContextProvider, useFormContext };
