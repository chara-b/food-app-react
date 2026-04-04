/* eslint-disable no-unused-vars */
import { createContext, useCallback, useContext, useMemo } from "react";
import {
  createNewProduct,
  updateProduct,
  updateWholeProduct,
} from "../services/productsHTTPRequests.js";
import { useForm } from "../hooks/useForm.jsx";
import { useAuthContext } from "./FakeAuthContext.jsx";
import {
  newProductForm,
  editProductForm,
  newInputForm,
} from "../constants/formNames.js";
import { productData } from "../constants/productData.js";

const FormContext = createContext(null);

function FormContextProvider({ children }) {
  const {
    formState,
    setFormState,
    onChange,
    onDelete,
    formErrors,
    setFormErrors,
    validateForm,
    isFormValid,
  } = useForm();

  const { user, isAuthenticated, login, logout } = useAuthContext();

  const getAndValidateForm = useCallback(
    function (productData, formRef, formName) {
      const product = {
        ...productData,
      };

      // get form fields value
      // the ingredient inputs
      const ingredients = Array.from(
        formRef?.current?.querySelectorAll(`[name^='${formName}_ingredient']`),
      )
        .map((ingredientElem) => ingredientElem.value)
        .join(",");

      // and the rest labeled inputs
      const inputs = Array.from(
        formRef?.current?.querySelectorAll(`input[id*="feature"]`),
      ).map((input) => ({
        name: `${input.name}`,
        value: input.value,
      }));

      // create the obj for validation
      const formRulesObj = {
        [`${formName}_ingredients`]: {
          value: ingredients,
          rules: { required: true },
        },
      };

      inputs.forEach((input, i) => {
        formRulesObj[input.name] = {
          value: input.value,
          rules: { required: true },
        };
      });

      // validate form
      const { formErrors, isFormValid } = validateForm(formRulesObj);

      if (!isFormValid) {
        setFormErrors(formErrors);
        return;
      }
      if (isFormValid) {
        setFormErrors({});
        // create the final product obj after validation that will be submitted
        product["ingredients_visible"] = ingredients.split(",");

        inputs.forEach((input, i) => {
          product[`${input.name.split("_")[1]}_visible`] = input.value;
        });

        return product;
      }
    },
    [setFormErrors, validateForm],
  );

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

      const product = getAndValidateForm(productData, formRef, newProductForm);

      if (product) {
        try {
          await createNewProduct(product);
          console.log("newProduct submitted");
          return true;
        } catch (error) {
          console.error("Failed to submit new product:", error);
          throw error;
        }
      }
    },
    [getAndValidateForm],
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

  const updateWholeProductDetails = useCallback(
    async (e, formRef, editedProduct) => {
      e.preventDefault();

      const product = getAndValidateForm(
        { id: editedProduct.id },
        formRef,
        editProductForm,
      );
      if (product) {
        try {
          await updateWholeProduct(product);
          console.log("product details updated");
          setFormState({});
          return true;
        } catch (error) {
          console.error("Failed to update product details", error);
          throw error;
        }
      }
    },
    [getAndValidateForm, setFormState],
  );

  const submitNewInputFields = useCallback(
    (e, formRef) => {
      e.preventDefault();

      const newInput = {
        label: "",
        value: "",
      };

      const label = formRef.current?.querySelector(
        `input[name="${newInputForm}_label"]`,
      ).value;

      const value = formRef.current?.querySelector(
        `input[name="${newInputForm}_value"]`,
      ).value;

      const { formErrors, isFormValid } = validateForm({
        [`${newInputForm}_label`]: {
          value: label,
          rules: { required: true },
        },
        [`${newInputForm}_value`]: {
          value: value,
          rules: { required: true },
        },
      });

      if (!isFormValid) {
        setFormErrors(formErrors);
        return;
      }
      if (isFormValid) {
        setFormErrors({});
        newInput.label = label;
        newInput.value = value;
        console.log("newInput submitted", newInput);
        return newInput;
      }
    },
    [setFormErrors, validateForm],
  );

  const value = useMemo(
    () => ({
      formState,
      setFormState,
      formErrors,
      setFormErrors,
      isFormValid,
      onChange,
      onDelete,
      user,
      isAuthenticated,
      logout,
      submitLogin,
      submitNewProduct,
      updateProductDetails,
      updateWholeProductDetails,
      submitNewInputFields,
    }),
    [
      formErrors,
      formState,
      isAuthenticated,
      isFormValid,
      logout,
      onChange,
      onDelete,
      setFormErrors,
      setFormState,
      submitLogin,
      submitNewInputFields,
      submitNewProduct,
      updateProductDetails,
      updateWholeProductDetails,
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
