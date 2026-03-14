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

  const submitNewProduct = useCallback(
    async (e, formRef) => {
      e.preventDefault();

      const product = {
        title: "",
        ingredients: [],
        price: "",
        quantity: "",
        currency: "euro",
        currency_symbol: "€",
        imgName: "",
        disabled: false,
      };

      const title = formRef.current?.querySelector('input[name="title"]').value;
      const ingredients = formRef.current?.querySelector(
        'input[name="ingredients"]',
      ).value;
      const price = formRef.current?.querySelector('input[name="price"]').value;
      const quantity = formRef.current?.querySelector(
        'input[name="quantity"]',
      ).value;
      const imgName = formRef.current?.querySelector(
        'input[name="imgName"]',
      ).value;

      const { formErrors, isFormValid } = validateForm({
        title: { value: title, rules: { required: true } },
        ingredients: { value: ingredients, rules: { required: true } },
        price: { value: price, rules: { required: true } },
        quantity: { value: quantity, rules: { required: true } },
        imgName: { value: imgName, rules: {} },
      });

      if (!isFormValid) {
        setFormErrors(formErrors);
        return;
      }
      if (isFormValid) {
        setFormErrors({});
        product.title = title;
        product.ingredients = ingredients.split(",");
        product.price = price;
        product.quantity = quantity;
        product.currency = "euro";
        product.currency_symbol = "€";
        product.imgName = imgName;
        product.disabled = false;
      }
      try {
        await createNewProduct(product);
        console.log("newProduct submitted");
      } catch (error) {
        console.error("Failed to submit new product:", error);
        throw error;
      }
    },
    [setFormErrors, validateForm],
  );

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
