/* eslint-disable no-unused-vars */
import { memo } from "react";
import { useFormContext } from "../contexts/FormContext";

const handleChange = (value) => {
  console.log(value);
};

const NewInputForm = memo(() => {
  const {
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
  } = useFormContext();
  <Form
    inputsWithLabels={[
      {
        label: "Enter new form field label",
        id: "new-field-label",
        name: "new-field-label",
        value: "",
        type: "text",
      },
      {
        label: "Enter new form field value",
        id: "new-field-value",
        name: "new-field-value",
        value: "",
        type: "text",
      },
    ]}
    formState={formState}
    onChange={(e) => handleChange(e.target.value)}
  />;
});

export default NewInputForm;
