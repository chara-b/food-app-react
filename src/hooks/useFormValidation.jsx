/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import {
  hasLettersAndNumbersOnly,
  hasOnlyLetters,
  hasOnlyNumbers,
  isCommaSeparatedWords,
  isValidBase64Image,
  isValidEmail,
  isValidImageName,
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

  const validateIngredients = useCallback((value) => {
    return isCommaSeparatedWords(value);
  }, []);

  const validateImgName = useCallback((value) => {
    return isValidImageName(value);
  }, []);

  const validateBase64Image = useCallback((value) => {
    return isValidBase64Image(value);
  }, []);

  const validateIngredient = useCallback((label) => {
    return hasLettersAndNumbersOnly(label);
  }, []);

  const validateFeature = useCallback((label) => {
    return hasLettersAndNumbersOnly(label);
  }, []);

  const validateField = useCallback(
    (fieldName, value, rules = {}) => {
      const errors = { ...fieldErrors };
      const splittedFieldName = fieldName.split("_");

      if (rules?.required && !value.trim() && !fieldName.includes(`imgName`)) {
        errors[fieldName] =
          `${splittedFieldName.length === 2 ? splittedFieldName[1] : splittedFieldName[0]} must be filled`;
      } else if (fieldName === "email" && !validateEmail(value)) {
        errors[fieldName] = "invalid email";
      } else if (
        (fieldName.includes("label") || fieldName.includes("title")) &&
        !validateLabel(value)
      ) {
        errors[fieldName] =
          `${splittedFieldName.length === 2 ? splittedFieldName[1] : splittedFieldName[0]} must contain only letters and numbers`;
      } else if (fieldName.includes("value") && !validateValue(value)) {
        errors[fieldName] = "value must contain either letters or numbers";
      } else if (fieldName.includes("price") && !validatePrice(value)) {
        if (fieldName.includes("price") && value.includes(",")) {
          errors[fieldName] = "enter float price as 1.50";
        } else {
          errors[fieldName] =
            "price must contain only integers or float numbers";
        }
      } else if (fieldName.includes("quantity") && !validateQuantity(value)) {
        errors[fieldName] = "quantity must contain only numbers";
      } else if (
        fieldName.includes("ingredients") &&
        !validateIngredients(value)
      ) {
        errors[fieldName] =
          "ingredients must contain only alphanumeric words or phrases with gaps seperated by commas";
      } else if (fieldName.includes("imgName") && !validateBase64Image(value)) {
        errors[fieldName] = "image not valid";
      } else if (
        fieldName.includes("ingredient-") &&
        !validateIngredient(value)
      ) {
        errors[fieldName] = "ingredient must be alphanumeric";
      } else if (fieldName.includes("feature-") && !validateFeature(value)) {
        errors[fieldName] = "must be alphanumeric";
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
      validateBase64Image,
      validateEmail,
      validateFeature,
      validateIngredient,
      validateIngredients,
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
