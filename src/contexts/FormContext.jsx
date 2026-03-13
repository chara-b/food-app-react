import { createContext, useCallback, useContext, useMemo } from "react";
import {
  createNewProduct,
  updateProduct,
} from "../services/productsHTTPRequests.js";
import { useForm } from "../hooks/useForm.jsx";
import { useAuthContext } from "./FakeAuthContext.jsx";

const FormContext = createContext(null);

function FormContextProvider({ children }) {
  const {
    formState,
    onChange,
    formErrors,
    setFormErrors,
    validateForm,
    isFormValid,
  } = useForm();

  const { user, isAuthenticated, login, logout } = useAuthContext();

  const submitLogin = useCallback(
    async (e, formRef) => {
      e.preventDefault();

      const email = formRef.current?.querySelector('input[name="email"]').value;
      const password = formRef.current?.querySelector(
        'input[name="password"]',
      ).value;

      const { formErrors, isFormValid } = validateForm({
        email: { value: email, rules: { required: true } },
        password: { value: password, rules: { required: true } },
      });

      if (!isFormValid) {
        setFormErrors(formErrors);
        return;
      }
      if (isFormValid) {
        setFormErrors({});
      }

      try {
        const loginSuccess = await login(email, password);
        if (loginSuccess) {
          setFormErrors({});
          return { success: true };
        } else {
          setFormErrors({
            form: "user not authenticated !",
          });
          return { success: false };
        }
      } catch (error) {
        return { error };
      }
    },
    [login, setFormErrors, validateForm],
  );

  const submitNewProduct = useCallback(async (newProduct) => {
    try {
      await createNewProduct(newProduct);
      console.log("newProduct submitted");
    } catch (error) {
      console.error("Failed to submit new product:", error);
      throw error;
    }
  }, []);

  const updateProductDetails = useCallback(async (productDetails) => {
    try {
      await updateProduct(productDetails);
      console.log("product details updated");
    } catch (error) {
      console.error("Failed to update product details:", error);
      throw error;
    }
  }, []);

  const submitNewInputFields = useCallback(() => {}, []);

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
      submitNewInputFields,
      submitNewProduct,
      updateProductDetails,
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
