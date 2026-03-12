import { useState, useCallback } from "react";
import {
  hasLettersAndNumbersOnly,
  hasOnlyLetters,
  hasOnlyNumbers,
  isValidEmail,
} from "../utils/validation";

export function useFormValidation() {
  const [fieldErrors, setFieldErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const validateEmail = useCallback((email) => {
    return isValidEmail(email);
  }, []);

  const validateLabel = useCallback((label) => {
    return hasLettersAndNumbersOnly(label);
  }, []);

  const validateValue = useCallback((value) => {
    return hasOnlyNumbers(value) || hasOnlyLetters(value);
  }, []);

  const validatePrice = useCallback((value) => {
    return hasOnlyNumbers(value);
  }, []);

  const validateQuantity = useCallback((value) => {
    return hasOnlyNumbers(value);
  }, []);

  const validateField = useCallback(
    (fieldName, value, rules = {}) => {
      const errors = { ...fieldErrors };

      if (rules?.required && !value?.trim()) {
        errors[fieldName] = `${fieldName} must be filled`;
      } else if (fieldName === "email" && !validateEmail(value)) {
        errors[fieldName] = "invalid email";
      } else if (fieldName === "label" && !validateLabel(value)) {
        errors[fieldName] = "label must contain only letters and numbers";
      } else if (fieldName === "value" && !validateValue(value)) {
        errors[fieldName] = "value must contain either letters or numbers";
      } else if (fieldName === "price" && !validatePrice(value)) {
        errors[fieldName] = "price must contain only numbers";
      } else if (fieldName === "quantity" && !validateQuantity(value)) {
        errors[fieldName] = "quantity must contain only numbers";
      } else {
        delete errors[fieldName];
      }

      setFieldErrors((prev) => ({ ...prev, ...errors }));

      const newErrors = { ...fieldErrors, ...errors };
      const isFieldValid = Object.keys(newErrors).length === 0;

      return { fieldErrors: newErrors, isFieldValid };
    },
    [
      fieldErrors,
      validateEmail,
      validateLabel,
      validatePrice,
      validateQuantity,
      validateValue,
    ],
  );

  const validateForm = useCallback(
    (fields) => {
      const errors = {};

      Object.entries(fields).forEach(([fieldName, { value, rules }]) => {
        const { isFieldValid, fieldErrors } = validateField(
          fieldName,
          value,
          rules,
        );
        if (!isFieldValid) {
          errors[fieldName] = fieldErrors[fieldName];
          setFieldErrors({});
        }
      });

      setFormErrors((prev) => ({ ...prev, ...errors }));

      const newErrors = { ...formErrors, ...errors };
      const isFormValid = Object.keys(newErrors).length === 0;

      return { formErrors: newErrors, isFormValid };
    },
    [formErrors, validateField],
  );

  return {
    formErrors,
    setFormErrors,
    validateForm,
    isFormValid: Object.keys(formErrors).length === 0,
  };
}
