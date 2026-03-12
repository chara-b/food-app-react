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
      const newErrors = { ...fieldErrors };

      if (rules?.required && !value?.trim()) {
        newErrors[fieldName] = `${fieldName} must be filled`;
      } else if (fieldName === "email" && !validateEmail(value)) {
        newErrors[fieldName] = "invalid email";
      } else if (fieldName === "label" && !validateLabel(value)) {
        newErrors[fieldName] = "label must contain only letters and numbers";
      } else if (fieldName === "value" && !validateValue(value)) {
        newErrors[fieldName] = "value must contain either letters or numbers";
      } else if (fieldName === "price" && !validatePrice(value)) {
        newErrors[fieldName] = "price must contain only numbers";
      } else if (fieldName === "quantity" && !validateQuantity(value)) {
        newErrors[fieldName] = "quantity must contain only numbers";
      } else {
        delete newErrors[fieldName];
      }

      setFieldErrors(newErrors);
      return { fieldErrors, isFieldValid: Object.keys(newErrors).length === 0 };
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
      const newErrors = {};

      Object.entries(fields).forEach(([fieldName, { value, rules }]) => {
        const { isFieldValid, fieldErrors } = validateField(
          fieldName,
          value,
          rules,
        );
        if (!isFieldValid) {
          newErrors[fieldName] = fieldErrors[fieldName];
        }
      });

      setFormErrors(newErrors);
      return { formErrors, isFormValid: Object.keys(newErrors).length === 0 };
    },
    [formErrors, validateField],
  );

  return {
    formErrors,
    validateForm,
    isFormValid: Object.keys(formErrors).length === 0,
  };
}
