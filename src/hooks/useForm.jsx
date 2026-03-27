import { useState } from "react";
import { useFormValidation } from "./useFormValidation";

export const useForm = () => {
  const [formState, setFormState] = useState({});

  // validation hook
  const { formErrors, setFormErrors, validateForm, isFormValid } =
    useFormValidation();

  const updateField = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFormErrors({});
  };

  const deleteField = (field) => {
    setFormState((prev) => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  return {
    formState,
    setFormState,
    onChange: updateField,
    onDelete: deleteField,
    formErrors,
    setFormErrors,
    validateForm,
    isFormValid,
  };
};
