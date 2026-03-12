/* eslint-disable no-unused-vars */
import { useActionState, useState } from "react";
import { useFormValidation } from "./useFormValidation";
import { useAuthContext } from "../contexts/FakeAuthContext";

// Custom hook with pending state
export const useForm = () => {
  const [formState, setFormState] = useState({});

  // validation hook
  const { formErrors, setFormErrors, validateForm, isFormValid } =
    useFormValidation();

  const updateField = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFormErrors({});
  };

  return {
    formState,
    onChange: updateField,
    formErrors,
    setFormErrors,
    validateForm,
    isFormValid,
  };
};
