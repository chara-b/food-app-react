import { createContext, useActionState, useContext, useMemo } from "react";
import {
  isEmpty,
  hasLettersAndNumbersOnly,
  hasOnlyLetters,
  hasOnlyNumbers,
} from "../utils/validation.js";

const FormContext = createContext(null);

const addNewInputActionFunction = (prevFormState, formData) => {
  const enteredLabel = formData.get("label");
  const enteredValue = formData.get("value");

  let errors = [];

  if (isEmpty(enteredLabel) || isEmpty(enteredValue)) {
    errors.push("fill up all fields!");
  }
  if (!hasLettersAndNumbersOnly(enteredLabel)) {
    errors.push("label must contain only letters with numbers!");
  }
  if (!hasOnlyLetters(enteredValue) || !hasOnlyNumbers(enteredValue)) {
    errors.push("value must be either a number or a string!");
  }
  if (errors.length > 0) {
    return { errors: errors };
  }

  return { errors: null, enteredValues: { enteredLabel, enteredValue } };
};

function FormContextProvider({ children }) {
  const [addNewInputFormState, addNewInputFormAction, addNewInputFormPending] =
    useActionState(addNewInputActionFunction, {
      errors: null,
      enteredValues: { enteredLabel: "", enteredValue: "" },
    });

  const value = useMemo(
    () => ({
      addNewInputFormState,
      addNewInputFormPending,
      addNewInputFormAction,
    }),
    [addNewInputFormAction, addNewInputFormPending, addNewInputFormState],
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
